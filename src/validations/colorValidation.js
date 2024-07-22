import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateColorData = async (req, res, next) => {
    const correctCondition = Joi.object({
        color_name: Joi.string().required().trim(),
        color_image: Joi.object({
            public_id: Joi.string(),
            url: Joi.string()
        }).optional(),
        color_code: Joi.string().required().trim()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo màu săc không hợp lệ'))
        })
}

export { validateColorData }
