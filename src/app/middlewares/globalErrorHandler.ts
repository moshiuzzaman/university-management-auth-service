/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/Logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('💣 globalErrorHandler ~ ', error)
    : errorLogger.error('💣 globalErrorHandler ~ ', error)

  let statusCode = 500
  let message = 'Something went wrong 😭😭!'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifliedError = handleValidationError(error)
    statusCode = simplifliedError.statusCode
    message = simplifliedError.message
    errorMessages = simplifliedError.errorMessages
  } else if (error instanceof ApiError) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
    statusCode = error?.statusCode
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else {
    message = error
    errorMessages = error ? [{ path: '', message: error }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'production' ? undefined : error?.stack,
  })
  next()
}

export default globalErrorHandler
