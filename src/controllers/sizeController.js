import { StatusCodes } from 'http-status-codes'
import { sizeService } from '~/services/sizeServices'

import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const sizeControllers = {
    createSize: async (req, res, next) => {
        try {
            const newSize = await sizeService.createSize(req.body)

            res.status(StatusCodes.CREATED).json({
                message: 'Tạo size thành công',
                data: newSize
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getAllSize: async (req, res, next) => {
        try {
            const sizes = await sizeService.getAllSize()

            res.status(StatusCodes.CREATED).json({
                message: 'Lấy dữ liệu size thành công',
                data: sizes
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getSizeById: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const size = await sizeService.getSizeById(id)

            res.status(StatusCodes.CREATED).json({
                message: 'Lấy dữ liệu size thành công',
                data: size
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateSize: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const size = await sizeService.updateSize(id, req.body)

            res.status(StatusCodes.CREATED).json({
                message: 'Cập nhật dữ liệu size thành công',
                data: size
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteSize: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const size = await sizeService.hiddenSize(id)

            res.status(StatusCodes.CREATED).json({
                message: 'Xoá size thành công',
                data: size
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { sizeControllers }
