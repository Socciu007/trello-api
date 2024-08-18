import { BOARD_TYPES, OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
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

const updateBoard = async (req, res, next) => {
  // Not required method in case update
  const conditionBoard = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG)
    )
  })
  try {
    // check conditions to create board
    await conditionBoard.validateAsync(req.body, {
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

const updateDataMoveCard = async (req, res, next) => {
  // Not required method in case update
  const conditionBoard = Joi.object({
    currentCardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    prevColumnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    prevCardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG)
    ),
    nextColumnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    nextCardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG)
    )
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
  checkBoard,
  updateBoard,
  updateDataMoveCard
}
