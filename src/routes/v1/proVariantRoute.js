import express from 'express'
import { proVariantControllers } from '~/controllers/proVariantController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateProVariantData } from '~/validations/proVariantValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, validateProVariantData, proVariantControllers.createVariant)
    .get('/:id', proVariantControllers.getVariant)
    .put('/:id', authMiddleware, isAdmin, validateProVariantData, proVariantControllers.updateVariant)
    .put('/restore/:id', authMiddleware, isAdmin, proVariantControllers.restoreVariant)
    .delete('/hidden/:id', authMiddleware, isAdmin, proVariantControllers.hiddenVariant)
    .delete('/:id', authMiddleware, isAdmin, proVariantControllers.deleteVariant)

export const proVariantRouter = Router
