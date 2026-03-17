import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "meetwave";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

let cached: MongoConnection | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cached) {
    return cached;
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB_NAME);

  cached = { client, db };
  return cached;
}

export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}
