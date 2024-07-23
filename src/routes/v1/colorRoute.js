import express from 'express'
import { colorControllers } from '~/controllers/colorController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateColorData } from '~/validations/colorValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateColorData, colorControllers.createColor)
    .get('/', colorControllers.getAllColor)
    .get('/:id', colorControllers.getColorById)
    .put('/:id', authMiddleware, isAdmin, validateColorData, colorControllers.updateColor)
    .delete('/:id', authMiddleware, isAdmin, colorControllers.deleteColor)

export const colorRoute = Router
