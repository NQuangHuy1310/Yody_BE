import express from 'express'
import { sizeController } from '~/controllers/sizeController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateSizeData } from '~/validations/sizeValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateSizeData, sizeController.createSize)
Router.get('/', sizeController.getAllSize)
Router.get('/:id', sizeController.getSizeById)
Router.put('/:id', authMiddleware, isAdmin, validateSizeData, sizeController.updateSize)
Router.delete('/:id', authMiddleware, isAdmin, sizeController.deleteSize)

export const sizeRoute = Router
