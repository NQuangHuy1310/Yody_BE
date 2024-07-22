import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateSizeData = async (req, res, next) => {
    const correctCondition = Joi.object({
        size_name: Joi.string().required().trim(),
        size_code: Joi.string().required().trim()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo size không hợp lệ'))
        })
}

export { validateSizeData }
