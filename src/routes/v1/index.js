import express from 'express'
import { boardRoutes } from './board.route'
import { columnRoutes } from './column.route'
import { cardRoutes } from './card.route'

const Router = express.Router()

// Route of the board API
Router.use('/boards', boardRoutes)

// Route of the column API
Router.use('/columns', columnRoutes)

// Route of the card API
Router.use('/cards', cardRoutes)

export const APIs_V1 = Router