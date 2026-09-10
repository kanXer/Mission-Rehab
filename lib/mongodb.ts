import { MongoClient, type Db } from "mongodb"

const DB_NAME = process.env.MONGODB_DB_NAME || "missionrehab"

export function isMongoConfigured(): boolean {
  return !!(
    process.env.MONGODB_URI ||
    process.env.NEXT_PUBLIC_MONGODB_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGO_URI
  )
}

function getMongoUri(): string {
  const uri =
    process.env.MONGODB_URI ||
    process.env.NEXT_PUBLIC_MONGODB_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGO_URI

  if (!uri) {
    throw new Error(
      "MongoDB URI not configured. Set MONGODB_URI or NEXT_PUBLIC_MONGODB_URI in .env.local or deployment environment."
    )
  }
  return uri.trim()
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

async function getClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri()
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      family: 4,
    })
    global._mongoClientPromise = client.connect().catch((err) => {
      // Clear cache on failure so future requests in warm containers can retry
      global._mongoClientPromise = undefined
      throw err
    })
  }
  return global._mongoClientPromise
}

let indexChecked = false

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  const db = client.db(DB_NAME)

  if (!indexChecked) {
    indexChecked = true
    db.collection("appointments")
      .createIndex({ timestamp: 1 }, { expireAfterSeconds: 172800 })
      .catch(() => {})
  }

  return db
}

export async function closeClient() {
  // Connection pooling handles cleanup
}

