import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateProVariantData = async (req, res, next) => {
    const correctCondition = Joi.object({
        product_id: Joi.string().required().trim(),
        product_color: Joi.string().optional(),
        product_size: Joi.string().optional(),
        variant_product_quantity: Joi.number().required(),
        variant_product_image: Joi.array().items({
            public_id: Joi.string().required(),
            url: Joi.string().required()
        })
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo thuộc tính không hợp lệ'))
        })
}

const validateProVariantDataUpdate = async (req, res, next) => {
    const correctCondition = Joi.object({
        product_id: Joi.string().required().trim(),
        product_color: Joi.string().optional(),
        product_size: Joi.string().optional(),
        variant_product_quantity: Joi.number().required(),
        variant_product_image: Joi.array()
            .items({
                public_id: Joi.string().required(),
                url: Joi.string().required()
            })
            .optional()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo thuộc tính không hợp lệ'))
        })
}

export { validateProVariantData, validateProVariantDataUpdate }
