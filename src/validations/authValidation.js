import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateRegisterData = async (req, res, next) => {
    const correctCondition = Joi.object({
        user_name: Joi.string().required().trim(),
        user_email: Joi.string().email().required().trim(),
        user_password: Joi.string().required().min(8).trim()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu người dùng không hợp lệ'))
        })
}

export { validateRegisterData }
