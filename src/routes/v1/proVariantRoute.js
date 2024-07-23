import express from 'express'
import { proVariantController } from '~/controllers/proVariantController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProVariantData } from '~/validations/proVariantValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProVariantData, proVariantController.createVariant)
    .get('/:id', proVariantController.getVariant)
    .put('/:id', authMiddleware, isAdmin, validateProVariantData, proVariantController.updateVariant)
    .put('/restore/:id', authMiddleware, isAdmin, proVariantController.restoreVariant)
    .delete('/hidden/:id', authMiddleware, isAdmin, proVariantController.hiddenVariant)
    .delete('/:id', authMiddleware, isAdmin, proVariantController.deleteVariant)

export const proVariantRouter = Router
