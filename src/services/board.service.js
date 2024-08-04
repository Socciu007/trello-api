import { slugify } from "@/utils"

const createBoard = async (bodyBoard) => {
  try {
    const newBoard = {
      ...bodyBoard,
      slug: slugify(bodyBoard.title)
    }

    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createBoard
}
