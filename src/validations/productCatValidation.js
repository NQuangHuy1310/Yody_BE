import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateProCatDataCreate = async (req, res, next) => {
    const correctCondition = Joi.object({
        category_name: Joi.string().required().trim(),
        category_image: Joi.object({
            public_id: Joi.string(),
            url: Joi.string()
        }).optional(),
        category_parent_id: Joi.string().optional()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo danh mục không hợp lệ'))
        })
}

const validateProCatDataUpdate = async (req, res, next) => {
    const correctCondition = Joi.object({
        category_name: Joi.string().required().trim(),
        category_image: Joi.object({
            public_id: Joi.string(),
            url: Joi.string()
        }).optional(),
        category_parent_id: Joi.string().optional()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo danh mục không hợp lệ'))
        })
}

export { validateProCatDataCreate, validateProCatDataUpdate }
