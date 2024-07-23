import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import { variantServices } from '~/services/variantsServices'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const proVariantController = {
    createVariant: async (req, res, next) => {
        try {
            const variantCode = uuidv4().replace(/-/g, '').slice(0, 8).toUpperCase()

            const variantData = {
                variant_product_code: variantCode,
                ...req.body
            }

            const newVariant = await variantServices.createVariant(variantData)

            res.status(StatusCodes.CREATED).json({
                message: 'Thêm thuộc tính cho sản phẩm thành công',
                variant_data: newVariant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateVariant: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const variant = await variantServices.updateVariant(id, req.body)

            res.status(StatusCodes.OK).json({
                message: 'Cập nhật thuộc tính thành công',
                variant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getVariant: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const variant = await variantServices.getVariant(id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy thuộc tính thành công',
                variant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    hiddenVariant: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const variant = await variantServices.hiddenVariant(id)

            res.status(StatusCodes.OK).json({
                message: 'Ẩn thuộc tính thành công',
                variant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    restoreVariant: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const variant = await variantServices.restoreVariant(id)

            res.status(StatusCodes.OK).json({
                message: 'Khôi phục thuộc tính thành công',
                variant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteVariant: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const variant = await variantServices.deleteVariant(id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá thuộc tính thành công',
                variant
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { proVariantController }
