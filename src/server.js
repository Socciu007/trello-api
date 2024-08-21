import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { env } from '@/config/environment'
import { CLOSE_DB, CONNECT_DB } from '@/config/mongodb'
import { APIs_V1 } from './routes/v1'
import { handleError } from './middlewares/handleError.middleware'
import { corsOptions } from './config/cors'

// Entry point for the application. Initialize Express, connect to MongoDB, and set up routes.
(async () => {
  try {
    const app = express()

    // Middleware configuration
    app.use(express.json())
    app.use(cors(corsOptions))

    CONNECT_DB()
    console.log('Connect MongoDB successfully')

    app.use('/v1', APIs_V1)

    app.use(handleError)

    // Enable HTTPS for production environment (support Render.com)
    if (env.NODE_ENV === 'production') {
      app.listen(process.env.PORT, () => {
        console.log(`Hello Tien, Starting server on port ${process.env.PORT}`)
      })
    } else { // Local dev
      app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello Tien, Starting server on port ${env.APP_PORT}`)
      })
    }

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
