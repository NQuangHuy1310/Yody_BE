import express from 'express'
import { sizeControllers } from '~/controllers/sizeController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateSizeData } from '~/validations/sizeValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateSizeData, sizeControllers.createSize)
    .get('/', sizeControllers.getAllSize)
    .get('/:id', sizeControllers.getSizeById)
    .put('/:id', authMiddleware, isAdmin, validateSizeData, sizeControllers.updateSize)
    .delete('/:id', authMiddleware, isAdmin, sizeControllers.deleteSize)

export const sizeRoute = Router
