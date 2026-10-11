# 🛒 বাজার দর (BazarDor)

আজকের বাজারের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।

BazarDor is a responsive Bangla grocery price tracker built with Next.js (App Router), TypeScript and Better Auth.

<div align="center">

### 🌐 Explore BazarDor

**আজকের বাজারদর, এক নজরে।**

[![Live Demo](https://img.shields.io/badge/🚀_Explore_Live_Demo-16A34A?style=for-the-badge&logoColor=white)](https://assignment-7-bazardor.vercel.app/)

</div>

## Technologies

- **Next.js 16** (App Router, Server Components) + **TypeScript**
- **Tailwind CSS v4**, Noto_Sans_Bengali (Bengali) via `next/font`
- **Better Auth** with the **MongoDB adapter** — email/password, Google, GitHub
- **react-hot-toast** for notifications, **lucide-react** for icons
- Deployed on **Vercel**

## Features

1. **Live price ticker** — infinite marquee under the navbar with emoji, name, price/unit and ▲/▼ change.
2. **Top movers** — the 6 biggest risers and 6 biggest fallers of the day, plus the full product grid with a smooth-scroll hero CTA.
3. **Category pages** — active-link navbar, skeleton loading, empty/404 states and a numeric **sort dropdown** (Bengali-digit safe).
4. **Protected product details** — min / max / average price and a market-by-market table (sorted by average).
5. **Authentication** — sign in / sign up, Google & GitHub login, validation + toast feedback, protected-route redirects (middleware + server check).
6. **Profile & update info** — view your account and change your name on a separate route.
7. **Fully responsive** — mobile, tablet and desktop; custom 404 page; refresh-safe dynamic routes on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in MongoDB + OAuth keys
npm run dev
```

OAuth callback URLs: `{BETTER_AUTH_URL}/api/auth/callback/google` and `/api/auth/callback/github`.

## Project structure

```
src/
  app/            routes: (site) home, category, product, profile · (auth) signin, signup · api/auth
  components/     layout · home · category · product · auth · profile · ui
  lib/            api client, auth, session guard, formatting helpers
  middleware.ts   cookie gate for /product and /profile
```

## Deploy (Vercel)

Add every variable from `.env.example` in Vercel, set `BETTER_AUTH_URL` to your production URL, and add the production callback URLs in your Google/GitHub OAuth apps.
