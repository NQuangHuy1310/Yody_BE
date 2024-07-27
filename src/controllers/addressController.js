import { StatusCodes } from 'http-status-codes'
import { addressServices } from '~/services/addressServices'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const addressControllers = {
    createAddress: async (req, res, next) => {
        try {
            const { _id } = req.user
            validateMongodbId(_id)
            const newAddress = await addressServices.createAddress({
                user_id: _id,
                ...req.body
            })

            res.status(StatusCodes.CREATED).json({
                message: 'Tạo mới địa chỉ thành công',
                address: newAddress
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getAddressByUserId: async (req, res, next) => {
        try {
            const { _id } = req.user
            validateMongodbId(_id)
            const userAddress = await addressServices.getAddressByUserId(_id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy địa chỉ thành công',
                address: userAddress
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getAddress: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const address = await addressServices.getAddressById(id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy địa chỉ thành công',
                address: address
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateAddress: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const address = await addressServices.updateAddress(id, req.body)

            res.status(StatusCodes.OK).json({
                message: 'Cập nhật địa chỉ thành công',
                address: address
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteAddress: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const address = await addressServices.deleteAddress(id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá địa chỉ thành công',
                address: address
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { addressControllers }
