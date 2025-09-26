import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";

const client = new MongoClient(
    process.env.MONGO_URI as string
);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    appName: "gearsey-backend",
    plugins: [],
});
