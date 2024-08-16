import { GET_DB } from '@/config/mongodb'
import { BOARD_TYPES, INVALID_UPDATE_FIELDS, OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { columnModel } from './columns'
import { cardModel } from './cards'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MSG))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

// Create a new board in boards table
const createBoard = async (data) => {
  try {
    const valData = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(valData)
  } catch (error) {
    throw new Error(error)
  }
}

// Query one items in boards table by id
const findOneBoardById = async (id) => {
  try {
    return await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

// Query
const getDetailBoard = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()

    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

// Update columnOrderIds field when created a new column
const updateFieldColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(column.boardId) },
        { $push: { columnOrderIds: column._id } },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

// Update field when move column
const updateFieldBoard = async (boardId, updateData) => {
  try {
    Object.keys(updateData).forEach(field => {
      if (INVALID_UPDATE_FIELDS.includes(field)) {
        delete updateData[field]
      }
    })

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(boardId) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneBoardById,
  getDetailBoard,
  updateFieldColumnOrderIds,
  updateFieldBoard
}
