import { cardService } from '@/services/card.service'
import { StatusCodes } from 'http-status-codes'

//Handle POST API requests create card
const createCard = async (req, res, next) => {
  try {
    const response = await cardService.createCard(req.body)

    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createCard
}