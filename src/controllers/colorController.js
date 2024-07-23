import { StatusCodes } from 'http-status-codes'
import { colorService } from '~/services/colorServices'

import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const colorControllers = {
    createColor: async (req, res, next) => {
        try {
            const newColor = await colorService.createColor(req.body)

            res.status(StatusCodes.CREATED).json({
                message: 'Tạo color thành công',
                data: newColor
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },
    getAllColor: async (req, res, next) => {
        try {
            const colors = await colorService.getAllColor()

            res.status(StatusCodes.CREATED).json({
                message: 'Lấy dữ liệu color thành công',
                data: colors
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getColorById: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const color = await colorService.getColorById(id)

            res.status(StatusCodes.CREATED).json({
                message: 'Lấy dữ liệu color thành công',
                data: color
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateColor: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const color = await colorService.updateColor(id, req.body)

            res.status(StatusCodes.CREATED).json({
                message: 'Cập nhật dữ liệu color thành công',
                data: color
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteColor: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const color = await colorService.hiddenColor(id)

            res.status(StatusCodes.CREATED).json({
                message: 'Xoá color thành công',
                data: color
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { colorControllers }
