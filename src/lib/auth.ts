import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Reuse one Mongo client across hot reloads / serverless invocations.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client =
  globalForMongo._mongoClient ??
  new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017/bazardor");
globalForMongo._mongoClient = client;

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, // after sign up the user is sent to the sign in page
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
