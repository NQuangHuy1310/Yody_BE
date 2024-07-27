import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateAddressData = async (req, res, next) => {
    const correctCondition = Joi.object({
        address_full_name: Joi.string().required().max(255).trim(),
        address_phone_number: Joi.string().max(10).required(),
        address_location: Joi.string().required(),
        address_city: Joi.string().required(),
        address_district: Joi.string().required(),
        address_ward: Joi.string().required().required()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu sản phẩm không hợp lệ'))
        })
}

export { validateAddressData }
