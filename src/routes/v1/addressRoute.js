import express from 'express'
import { addressControllers } from '~/controllers/addressController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { validateAddressData } from '~/validations/addressValidation'

const Router = express.Router()

Router.post('/', authMiddleware, validateAddressData, addressControllers.createAddress)
    .get('/', authMiddleware, addressControllers.getAddressByUserId)
    .get('/:id', authMiddleware, addressControllers.getAddress)
    .put('/:id', authMiddleware, validateAddressData, addressControllers.updateAddress)
    .delete('/:id', authMiddleware, addressControllers.deleteAddress)

export const addressRouter = Router
