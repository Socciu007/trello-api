import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let dbInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // Connect to MongoDB Atlas with URI
  await mongoClientInstance.connect()

  // Get the database after connect MongoDB successfully
  dbInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!dbInstance) throw new Error('Must connect MongoDB Atlas to get database first')
  return dbInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}