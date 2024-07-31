import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Board API' })
  })
  .post((req, res) => {
    const { title, description } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }
    res.status(StatusCodes.CREATED).json({ message: 'Board created', title, description })
  })

export const boardRoutes = Router