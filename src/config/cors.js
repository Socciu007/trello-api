import { WHITELIST_DOMAINS } from '@/utils'
import { env } from './environment'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// CORS Option config
export const corsOptions = {
  origin: function (origin, callback) {
    //
    if (!origin && env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    // Check the domain name to see if it is accepted
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Return error if it is reject
    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    )
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS will allow the server to receive cookies from the client
  credentials: true
}
