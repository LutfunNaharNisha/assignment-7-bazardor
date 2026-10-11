import type { Category, Product } from "./types";

const BASES = [
	process.env.API_BASE_URL_1 ??
		"https://api.api-store.workers.dev/api/bazardor",
	process.env.API_BASE_URL_2 ?? "https://api.abcz.workers.dev/api/bazardor",
	process.env.API_BASE_URL_3 ??
		"https://openapi.programming-hero.com/api/bazardor",
];

class NotFoundError extends Error {}

function unwrap<T>(json: unknown): T {
	if (
		json &&
		typeof json === "object" &&
		!Array.isArray(json) &&
		"data" in json
	) {
		return (json as { data: T }).data;
	}
	return json as T;
}

/** Try the primary API, then fall back to the alternative one. */
async function request<T>(path: string): Promise<T> {
	let lastError: unknown;
	for (const base of BASES) {
		try {
			const res = await fetch(`${base}${path}`, {
				next: { revalidate: 300 },
			});
			if (res.status === 404) throw new NotFoundError(path);
			if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
			return unwrap<T>(await res.json());
		} catch (err) {
			if (err instanceof NotFoundError) throw err;
			lastError = err;
		}
	}
	throw lastError instanceof Error
		? lastError
		: new Error("API request failed");
}

export const getCategories = () => request<Category[]>("/categories");

export async function getCategory(slug: string): Promise<Category | null> {
	const categories = await getCategories();
	return categories.find((c) => c.slug === slug || c.id === slug) ?? null;
}

export const getProducts = () => request<Product[]>("/products");

export const getProductsByCategory = (slug: string) =>
	request<Product[]>(`/products?category=${encodeURIComponent(slug)}`);

/** The route uses the slug; the API addresses products by id, so resolve either. */
export async function getProduct(slug: string): Promise<Product | null> {
	const products = await getProducts();
	const found = products.find(
		(p) => p.slug === slug || String(p.id) === slug,
	);
	if (!found) return null;
	try {
		return await request<Product>(`/products/${found.id}`);
	} catch {
		return found;
	}
}
