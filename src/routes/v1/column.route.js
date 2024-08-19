
import { columnController } from '@/controllers/column.controller'
import { columnValidation } from '@/validations/column.validation'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Column API' })
  })
  .post(columnValidation.checkColumn, columnController.createColumn)

Router.route('/:id')
  .get()
  .put(columnValidation.updateColumn, columnController.updateColumn)
  .delete(columnController.deleteColumn)

export const columnRoutes = Router
