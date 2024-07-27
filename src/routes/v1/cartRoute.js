import express from 'express'
import { cartControllers } from '~/controllers/cartController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { validateCartData, validateCartDataUpdate } from '~/validations/cartValidation'

const Router = express.Router()

Router.post('/', authMiddleware, validateCartData, cartControllers.createCartItem)
    .get('/', authMiddleware, cartControllers.getCartByUserId)
    .put('/update', authMiddleware, validateCartDataUpdate, cartControllers.updateCartQuantityItem)
    .delete('/clear', authMiddleware, cartControllers.clearCart)
    .delete('/:id', authMiddleware, cartControllers.deleteCartItem)

export const cartRouter = Router
