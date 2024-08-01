class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)

    // Name of custom error, default is Error
    this.name = 'ApiError'

    // Assign http status code here
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
