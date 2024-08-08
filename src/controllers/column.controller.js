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

export const columnController = {
  createColumn
}