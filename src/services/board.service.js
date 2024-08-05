import { boardModel } from '@/models/boards'
import { slugify } from '@/utils'

const createBoard = async (bodyBoard) => {
  try {
    const newBoard = {
      ...bodyBoard,
      slug: slugify(bodyBoard.title)
    }

    const createdBoard = await boardModel.createBoard(newBoard)

    const getNewBoard = await boardModel.findOneBoardById(
      createdBoard.insertedId
    )

    return getNewBoard
  } catch (error) {
    return error
  }
}

export const boardService = {
  createBoard
}
