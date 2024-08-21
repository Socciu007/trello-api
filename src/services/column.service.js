import { boardModel } from '@/models/boards'
import { cardModel } from '@/models/cards'
import { columnModel } from '@/models/columns'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// Logic create new board
const createColumn = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createColumn(newColumn)
    const getNewColumn = await columnModel.findOneColumnById(
      createdColumn.insertedId.toString()
    )

    if (getNewColumn) {
      getNewColumn.cards = []

      await boardModel.updateFieldColumnOrderIds(getNewColumn)
    }

    return {
      'statusCode': 201,
      'message': 'Create column successfully!',
      'data': getNewColumn
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Logic update column when move card in the same column
const updateColumn = async (id, bodyColumn) => {
  try {
    const newColumn = {
      ...bodyColumn,
      updatedAt: Date.now()
    }

    const updatedColumn = await columnModel.updateColumn(id, newColumn)

    return {
      'statusCode': 200,
      'message': 'Update column successfully!',
      'data': updatedColumn
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Logic get board by id
const getDetailColumn = async (id) => {
  try {
    const column = await columnModel.getDetailColumn(id)

    if (!column) throw new ApiError(StatusCodes.NOT_FOUND, 'Column is not found!')

    return {
      'statusCode': 200,
      'message': 'Get column successfully!',
      'data': column
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Logic delete column by columnId
const deleteColumn = async (columnId) => {
  try {
    // Remove column by id
    await columnModel.deleteOneById(columnId)

    // Remove all cards in that column
    await cardModel.deleteManyByColumnId(columnId)

    return {
      'statusCode': 200,
      'message': 'Delete column and its cards successfully!'
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const columnService = {
  createColumn,
  getDetailColumn,
  updateColumn,
  deleteColumn
}
