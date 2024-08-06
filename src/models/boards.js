import { GET_DB } from '@/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
import Joi from 'joi'
import { ObjectId } from 'mongodb'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createBoard = async (data) => {
  try {
    const valData = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(valData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneBoardById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneBoardById
}
