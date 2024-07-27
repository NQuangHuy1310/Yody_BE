import express from 'express'
import { voucherControllers } from '~/controllers/voucherController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateVoucherData } from '~/validations/voucherValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateVoucherData, voucherControllers.createVoucher)
    .get('/search', voucherControllers.searchVoucher)
    .get('/', voucherControllers.getVouchers)
    .get('/:id', voucherControllers.getVoucher)
    .put('/:id', authMiddleware, isAdmin, validateVoucherData, voucherControllers.updateVoucher)
    .delete('/hidden/:id', authMiddleware, isAdmin, voucherControllers.hiddenVoucher)
    .delete('/:id', authMiddleware, isAdmin, voucherControllers.deleteVoucher)

export const voucherRouter = Router
