import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '@/config/environment'
import { CLOSE_DB, CONNECT_DB } from '@/config/mongodb'
import { APIs_V1 } from './routes/v1'
import { handleError } from './middlewares/handleError.middleware'

// Entry point for the application. Initialize Express, connect to MongoDB, and set up routes.
;(async () => {
  try {
    const app = express()

    // Middleware configuration
    app.use(express.json())

    CONNECT_DB()
    console.log('Connect MongoDB sucessfully')

    app.use('/v1', APIs_V1)

    app.use(handleError)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Hello Tien, Starting server on port ${env.APP_PORT}`)
    })

    // Add exit hook to close MongoDB connection when app is terminated or stopped
    exitHook(() => {
      console.log('shutdown')
      CLOSE_DB()
    })
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
