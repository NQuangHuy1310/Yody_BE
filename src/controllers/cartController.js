import { StatusCodes } from 'http-status-codes'
import { cartServices } from '~/services/cartServices'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const cartControllers = {
    createCartItem: async (req, res, next) => {
        try {
            const { _id } = req.user
            validateMongodbId(_id)

            const cart = await cartServices.createCart({
                cart_user_id: _id,
                ...req.body
            })

            res.status(StatusCodes.CREATED).json({
                message: 'Thêm sản phẩm vào giỏ hàng thành công!',
                cart: cart
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getCartByUserId: async (req, res, next) => {
        try {
            const { _id } = req.user
            validateMongodbId(_id)

            const carts = await cartServices.getCartByUserId(_id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy thông tin giỏ hàng thành công!',
                carts: carts
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateCartQuantityItem: async (req, res, next) => {
        try {
            const { cartId, newQuantity } = req.body
            validateMongodbId(cartId)

            const updateCart = await cartServices.updateCartQuantityItem(cartId, newQuantity)

            res.status(StatusCodes.OK).json({
                message: 'Cập nhật giỏ hàng thành công!',
                carts: updateCart
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteCartItem: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)

            const cart = await cartServices.deleteCartItem(id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá sản phẩm trong giỏ hàng thành công!',
                cart: cart
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    clearCart: async (req, res, next) => {
        try {
            const { _id } = req.user
            validateMongodbId(_id)

            await cartServices.clearCart(_id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá giỏ hàng thành công!'
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { cartControllers }
