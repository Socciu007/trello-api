import { cardModel } from '@/models/cards'
import { columnModel } from '@/models/columns'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// Logic create new board
const createCard = async (bodyCard) => {
  try {
    const newCard = {
      ...bodyCard
    }

    const createdCard = await cardModel.createCard(newCard)
    const getNewCard = await cardModel.findOneCardById(
      createdCard.insertedId.toString()
    )

    // Update column cardorderIds if card created in column
    if (getNewCard) {
      await columnModel.updateFieldCardOrderIds(getNewCard)
    }

    return {
      'statusCode': 201,
      'message': 'Create card successfully!',
      'data': getNewCard
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Logic get board by id
const getDetailCard = async (id) => {
  try {
    const card = await cardModel.getDetailCard(id)

    if (!card) throw new ApiError(StatusCodes.NOT_FOUND, 'Card is not found!')

    return {
      'statusCode': 200,
      'message': 'Get card successfully!',
      'data': card
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const cardService = {
  createCard,
  getDetailCard
}
