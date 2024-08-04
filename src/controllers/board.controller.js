import { boardService } from '@/services/board.service'

const { StatusCodes } = require('http-status-codes')

// Handle POST API requests create board
const createBoard = async (req, res, next) => {
  try {
    const response = await boardService.createBoard(req.body)
    console.log(response)

    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createBoard
}
