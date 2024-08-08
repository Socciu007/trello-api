import { BOARD_TYPES } from '@/utils'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const checkBoard = async (req, res, next) => {
  const conditionBoard = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC).required()
  })
  try {
    // check conditions to create board
    await conditionBoard.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      new Error(error).message
    )
    next(customError)
  }
}

export const boardValidation = {
  checkBoard
}
