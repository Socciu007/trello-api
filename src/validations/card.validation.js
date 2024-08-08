import { OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const checkCard = async (req, res, next) => {
  const conditionCard = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    columnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MSG),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().optional()
  })

  // check conditions to create card
  try {
    await conditionCard.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      new Error(error).message
    )
    next(customError)
  }
}

export const cardValidation = {
  checkCard
}
