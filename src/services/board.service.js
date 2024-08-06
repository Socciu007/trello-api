import { boardModel } from '@/models/boards'
import { slugify } from '@/utils'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// Logic create new board
const createBoard = async (bodyBoard) => {
  try {
    const newBoard = {
      ...bodyBoard,
      slug: slugify(bodyBoard.title)
    }

    const createdBoard = await boardModel.createBoard(newBoard)

    const getNewBoard = await boardModel.findOneBoardById(
      createdBoard.insertedId.toString()
    )

    return {
      'statusCode': 201,
      'message': 'Create board successfully!',
      'data': getNewBoard
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Logic get board by id
const getDetailBoard = async (id) => {
  try {
    const board = await boardModel.getDetailBoard(id)

    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board is not found!')

    return {
      'statusCode': 200,
      'message': 'Get board successfully!',
      'data': board
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createBoard,
  getDetailBoard
}
