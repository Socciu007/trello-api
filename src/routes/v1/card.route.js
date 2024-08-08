import { cardController } from '@/controllers/card.controller'
import { cardValidation } from '@/validations/card.validation'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Card API' })
  })
  .post(cardValidation.checkCard, cardController.createCard)

Router.route('/:id')
  .get(cardController.getDetails)
  .put()
  .delete()

export const cardRoutes = Router
