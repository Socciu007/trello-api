import express from 'express'
import { boardRoutes } from './board.route'

const Router = express.Router()

Router.use('/boards', boardRoutes)

export const APIs_V1 = Router