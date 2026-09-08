import { MongoClient, type Db } from "mongodb"

const DB_NAME = process.env.MONGODB_DB_NAME || "missionrehab"

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

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const uri = getMongoUri()
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    })
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  const uri = getMongoUri()
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
  })
  clientPromise = client.connect()
}

let indexChecked = false

export async function getDb(): Promise<Db> {
  const client = await clientPromise
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

