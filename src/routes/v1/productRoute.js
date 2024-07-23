import express from 'express'
import { productControllers } from '~/controllers/productController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProductData } from '~/validations/productValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProductData, productControllers.createProduct)
    .get('/search', productControllers.searchProductByName)
    .get('/', productControllers.getProducts)
    .get('/hidden', authMiddleware, isAdmin, productControllers.getProductHidden)
    .get('/:id', productControllers.getProduct)
    .put('/:id', authMiddleware, isAdmin, validateProductData, productControllers.updateProduct)
    .put('/restore/:id', authMiddleware, isAdmin, productControllers.restoreProduct)
    .delete('/hidden/:id', authMiddleware, isAdmin, productControllers.hiddenProduct)
    .delete('/id', authMiddleware, isAdmin, productControllers.deleteProduct)

export const productRouter = Router
