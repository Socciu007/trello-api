import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const schemaBoard = Joi.object({
  title: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(3).max(256)
})

const createBoard = (req, res, next) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  res.status(StatusCodes.CREATED).json({ message: 'Board created', title, description })
}