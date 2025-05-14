import { MongoClient, Db } from 'mongodb'
const uri = process.env.MONGODB_C_STRING!
const dbName = 'mainDB'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function database(): Promise<Db> {
  if (cachedDb) return cachedDb
  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri)
      await cachedClient.connect()
      console.log('Connected established with MongoDB')
    }
    cachedDb = cachedClient.db(dbName)
    return cachedDb
  } catch (error) {
    console.error('Unable to establish connection with MongoDB', error)
    throw new Error('Could not connect to MongoDB')
  }
}
