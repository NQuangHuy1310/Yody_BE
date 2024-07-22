import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateProductData = async (req, res, next) => {
    const correctCondition = Joi.object({
        product_name: Joi.string().required().trim(),
        product_description: Joi.string(),
        product_price: Joi.number().required(),
        product_price_sale: Joi.number().optional(),
        product_quantity: Joi.number().required(),
        product_thumbnail: Joi.object({
            public_id: Joi.string(),
            url: Joi.string()
        }).optional(),
        product_tags: Joi.array().items(Joi.string()).optional(),
        product_category: Joi.string().required().trim()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu sản phẩm không hợp lệ'))
        })
}

export { validateProductData }
