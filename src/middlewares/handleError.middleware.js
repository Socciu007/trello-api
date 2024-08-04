import { env } from '@/config/environment'
import { StatusCodes } from 'http-status-codes'

export const handleError = (err, req, res, next) => {
  // default statusCode of status error if not status code
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Create response error object
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  // Remove stack attribute in error response if not development environment
  if (env.NODE_ENV !== 'development') delete responseError.stack

  // Send error response to client
  res.status(responseError.statusCode).json(responseError)
}
