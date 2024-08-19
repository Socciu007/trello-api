import { boardController } from '@/controllers/board.controller'
import { boardValidation } from '@/validations/board.validation'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Board API' })
  })
  .post(boardValidation.checkBoard, boardController.createBoard)

Router.route('/:id')
  .get(boardController.getDetailBoard)
  .put(boardValidation.updateBoard, boardController.updateBoard)
  .delete(boardController.deleteBoard)

// Api support moving card between two different column
Router.route('/support/moving_card')
  .put(boardValidation.updateDataMoveCard, boardController.updateDataMoveCard)

export const boardRoutes = Router
