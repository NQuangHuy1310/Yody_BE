import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const validateVoucherData = async (req, res, next) => {
    const correctCondition = Joi.object({
        voucher_name: Joi.string().required().trim(),
        voucher_discount: Joi.number().required(),
        voucher_quantity: Joi.number().required(),
        voucher_start_date: Joi.date().required(),
        voucher_end_date: Joi.date().required()
    })

    await correctCondition
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch(() => {
            next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Dữ liệu tạo mã giảm giá không hợp lệ'))
        })
}

export { validateVoucherData }
