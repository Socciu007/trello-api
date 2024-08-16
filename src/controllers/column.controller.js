import { columnService } from '@/services/column.service'
import { StatusCodes } from 'http-status-codes'

//Handle POST API requests create column
const createColumn = async (req, res, next) => {
  try {
    const response = await columnService.createColumn(req.body)

    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

//Handle PUT API requests update column when move card in the same column
const updateColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const response = await columnService.updateColumn(columnId, req.body)

    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createColumn,
  updateColumn
}