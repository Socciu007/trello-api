import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const checkCreateBoard = async (req, res, next) => {
  const conditionBoard = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    // check conditions to create board
    await conditionBoard.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const customError = ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      new Error(error).message
    )
    next(customError)
  }
}

export const boardValidation = {
  checkCreateBoard
}
