import express from 'express'
import { productController } from '~/controllers/productController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProductData } from '~/validations/productValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProductData, productController.createProduct)
    .get('/search', productController.searchProductByName)
    .get('/', productController.getProducts)
    .get('/hidden', authMiddleware, isAdmin, productController.getProductHidden)
    .get('/:id', productController.getProduct)
    .put('/:id', authMiddleware, isAdmin, validateProductData, productController.updateProduct)
    .put('/restore/:id', authMiddleware, isAdmin, productController.restoreProduct)
    .delete('/hidden/:id', authMiddleware, isAdmin, productController.hiddenProduct)
    .delete('/id', authMiddleware, isAdmin, productController.deleteProduct)

export const productRouter = Router
