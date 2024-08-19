import { boardService } from '@/services/board.service'

const { StatusCodes } = require('http-status-codes')

// Handle POST API requests create board
const createBoard = async (req, res, next) => {
  try {
    const response = await boardService.createBoard(req.body)

    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

// Handle PUT API requests update board
const updateBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const response = await boardService.updateBoard(boardId, req.body)

    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

// Handle GET API requests get board by id
const getDetailBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const response = await boardService.getDetailBoard(boardId)

    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

// Handle PUT API requests support update data move card in two different column
const updateDataMoveCard = async (req, res, next) => {
  try {
    const response = await boardService.updateDataMoveCard(req.body)

    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

// Handle DELETE API requests delete board by id
const deleteBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const response = await boardService.deleteBoard(boardId)

    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createBoard,
  getDetailBoard,
  updateBoard,
  updateDataMoveCard,
  deleteBoard
}
