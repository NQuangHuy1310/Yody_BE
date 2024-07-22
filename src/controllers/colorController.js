import { StatusCodes } from 'http-status-codes'
import { colorService } from '~/services/colorServices'

import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createColor = async (req, res, next) => {
    try {
        const newColor = await colorService.createColor(req.body)

        res.status(StatusCodes.CREATED).json({
            message: 'Tạo color thành công',
            data: newColor
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const getAllColor = async (req, res, next) => {
    try {
        const colors = await colorService.getAllColor()

        res.status(StatusCodes.CREATED).json({
            message: 'Lấy dữ liệu color thành công',
            data: colors
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const getColorById = async (req, res, next) => {
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
}

const updateColor = async (req, res, next) => {
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
}

const deleteColor = async (req, res, next) => {
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

export const colorController = {
    createColor,
    getAllColor,
    getColorById,
    updateColor,
    deleteColor
}
