import Joi from 'joi'
import { INVALID_UPDATE_FIELDS_MORE, OBJECT_ID_RULE, OBJECT_ID_RULE_MSG } from '@/utils'
import { GET_DB } from '@/config/mongodb'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MSG),
  columnId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MSG),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createCard = async (data) => {
  try {
    const valData = await validateBeforeCreate(data)

    // Transform some fields of cards into Object ID type
    valData.boardId = new ObjectId(valData.boardId)
    valData.columnId = new ObjectId(valData.columnId)

    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(valData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneCardById = async (id) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

// Update field columnId when move card in two column
const updateFieldCard = async (cardId, updateData) => {
  try {
    Object.keys(updateData).forEach(field => {
      if (INVALID_UPDATE_FIELDS_MORE.includes(field)) {
        delete updateData[field]
      }
    })

    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(cardId) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

// Remove many cards by columnId
const deleteManyByColumnId = async (columnId) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({ columnId: new ObjectId(columnId) })
  } catch (error) {
    throw new Error(error)
  }
}

// Remove a card by cardId
const deleteOneById = async (id) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createCard,
  findOneCardById,
  updateFieldCard,
  deleteManyByColumnId,
  deleteOneById
}
