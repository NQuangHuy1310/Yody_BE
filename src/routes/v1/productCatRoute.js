import express from 'express'
import { proCatControllers } from '~/controllers/productCatController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProCatDataCreate, validateProCatDataUpdate } from '~/validations/productCatValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProCatDataCreate, proCatControllers.createProCat)
    .get('/', proCatControllers.getCategories)
    .put('/:id', authMiddleware, isAdmin, validateProCatDataUpdate, proCatControllers.updateCategory)
    .delete('/:id', authMiddleware, isAdmin, proCatControllers.hiddenCategory)

export const proCatRouter = Router
