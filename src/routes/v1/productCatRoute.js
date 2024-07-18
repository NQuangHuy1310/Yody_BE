import express from 'express'
import { proCatController } from '~/controllers/productCatController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProCatDataCreate, validateProCatDataUpdate } from '~/validations/productCatValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProCatDataCreate, proCatController.createProCat)
Router.get('/', proCatController.getCategories)
Router.put('/:id', authMiddleware, isAdmin, validateProCatDataUpdate, proCatController.updateCategory)
Router.delete('/:id', authMiddleware, isAdmin, proCatController.hiddenCategory)

export const proCatRouter = Router
