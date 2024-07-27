import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateCartData = async (req, res, next) => {
    const correctCondition = Joi.object({
        cart_product_id: Joi.string().required().trim(),
        cart_product_variant: Joi.string().optional(),
        cart_quantity: Joi.number().required(),
        cart_total_price: Joi.number().required()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu không hợp lệ'))
        })
}

const validateCartDataUpdate = async (req, res, next) => {
    const correctCondition = Joi.object({
        cartId: Joi.string().required().trim(),
        newQuantity: Joi.number().required()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu không hợp lệ'))
        })
}

export { validateCartData, validateCartDataUpdate }
