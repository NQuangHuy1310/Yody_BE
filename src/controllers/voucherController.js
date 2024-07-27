import { StatusCodes } from 'http-status-codes'
import { voucherServices } from '~/services/voucherServices'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const voucherType = {
    active: 'active',
    hidden: 'hidden'
}

const voucherControllers = {
    createVoucher: async (req, res, next) => {
        try {
            const newVoucher = await voucherServices.createVoucher({
                ...req.body
            })

            res.status(StatusCodes.CREATED).json({
                message: 'Tạo mã giảm giá thành công!',
                voucher_data: newVoucher
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getVouchers: async (req, res, next) => {
        try {
            const { page, limit, type } = req.query
            let vouchers

            if (type === voucherType.active) {
                vouchers = await voucherServices.getVouchersActive(page, limit)
            } else if (type === voucherType.hidden) {
                vouchers = await voucherServices.getVouchersHidden(page, limit)
            } else {
                res.status(StatusCodes.CREATED).json({
                    message: 'Không có mã giảm giá!',
                    voucher_data: []
                })
            }

            res.status(StatusCodes.CREATED).json({
                message: 'Lấy mã giảm giá thành công!',
                voucher_data: vouchers
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getVoucher: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const voucher = await voucherServices.getVoucher(id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy mã giảm giá thành công!',
                voucher_data: {
                    voucher
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    searchVoucher: async (req, res, next) => {
        try {
            const { q } = req.query
            const vouchers = await voucherServices.searchVoucherByName(q)

            if (!vouchers) {
                res.status(StatusCodes.OK).json({
                    message: 'Mã giảm giá không tồn tại, vui lòng thủ lại'
                })
            }

            res.status(StatusCodes.OK).json({
                message: 'Tìm kiếm mã già giá thành công!',
                voucher_data: {
                    vouchers
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateVoucher: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const voucher = await voucherServices.updateVoucher(id, req.body)

            res.status(StatusCodes.OK).json({
                message: 'Cập nhật mã giảm giá thành công!',
                voucher_data: {
                    voucher
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    hiddenVoucher: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const voucher = await voucherServices.hiddenVoucher(id)

            res.status(StatusCodes.OK).json({
                message: 'Ẩn mã giảm giá thành công!',
                voucher_data: {
                    voucher
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteVoucher: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const voucher = await voucherServices.deleteVoucher(id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá mã giảm giá thành công!',
                voucher_data: {
                    voucher
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { voucherControllers }
