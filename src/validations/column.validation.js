import { OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const checkColumn = async (req, res, next) => {
  const conditionColumn = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })

  // Validate request body to create column
  try {
    await conditionColumn.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      new Error(error).message
    )
    next(customError)
  }
}

const updateColumn = async (req, res, next) => {
  const conditionColumn = Joi.object({
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG)
    )
  })

  // Validate request body to create column
  try {
    await conditionColumn.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      new Error(error).message
    )
    next(customError)
  }
}

export const columnValidation = {
  checkColumn,
  updateColumn
}
