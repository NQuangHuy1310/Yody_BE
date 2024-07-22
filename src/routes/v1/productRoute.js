import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProductData } from '~/validations/productValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProductData, productController.createProduct)
Router.get('/search', productController.searchProductByName)
Router.get('/', productController.getProducts)
Router.get('/:id', productController.getProduct)
Router.put('/:id', authMiddleware, isAdmin, validateProductData, productController.updateProduct)
Router.delete('/:id', authMiddleware, isAdmin, productController.hiddenProduct)

export const productRouter = Router
