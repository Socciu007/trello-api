const { StatusCodes } = require('http-status-codes')

// Handle POST API requests create board
const createBoard = async (req, res) => {
  try {
    console.log(req.body)
    res.status(StatusCodes.CREATED).json({
      status: 1,
      message: 'Create board successfully',
      data: req.body
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 0,
      message: new Error(error).message
    })
  }
}

export const boardController = {
  createBoard
}
