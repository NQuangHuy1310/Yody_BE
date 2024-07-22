import express from 'express'
import { colorController } from '~/controllers/colorController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateColorData } from '~/validations/colorValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateColorData, colorController.createColor)
Router.get('/', colorController.getAllColor)
Router.get('/:id', colorController.getColorById)
Router.put('/:id', authMiddleware, isAdmin, validateColorData, colorController.updateColor)
Router.delete('/:id', authMiddleware, isAdmin, colorController.deleteColor)

export const colorRoute = Router
