import { StatusCodes } from 'http-status-codes'
import { productServices } from '~/services/productServices'
import { variantServices } from '~/services/variantsServices'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/fomatters'
import validateMongodbId from '~/utils/validateMongodbId'

const productControllers = {
    createProduct: async (req, res, next) => {
        try {
            const slug = slugify(req.body.product_name)
            const newProduct = await productServices.createProduct({
                ...req.body,
                product_slug: slug
            })

            res.status(StatusCodes.CREATED).json({
                message: 'Tạo sản phẩm thành công!',
                product_data: newProduct
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const product = await productServices.getProduct(id)
            const variants = await variantServices.getVariantsByProductId(id)

            res.status(StatusCodes.OK).json({
                message: 'Lấy sản phẩm thành công!',
                product_data: {
                    product,
                    variants
                }
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getProducts: async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query
            const products = await productServices.getAllProduct(page, limit)

            res.status(StatusCodes.OK).json({
                message: 'Lấy sản phẩm thành công!',
                product_data: products
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    getProductHidden: async (req, res, next) => {
        try {
            const products = await productServices.getProductHidden()

            res.status(StatusCodes.OK).json({
                message: 'Lấy sản phẩm thành công!',
                product_data: products
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    searchProductByName: async (req, res, next) => {
        try {
            const { q } = req.query
            const products = await productServices.searchProductByName(q)

            res.status(StatusCodes.OK).json({
                message: 'Tìm sản phẩm thành công!',
                product_data: products
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const product = await productServices.updateProduct(id, req.body)

            res.status(StatusCodes.OK).json({
                message: 'Cập nhật sản phẩm thành công!',
                product_data: product
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    hiddenProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const product = await productServices.hiddenProduct(id)

            res.status(StatusCodes.OK).json({
                message: 'Xoá sản phẩm thành công!',
                product_data: product
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    restoreProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const product = await productServices.restoreProduct(id)

            res.status(StatusCodes.OK).json({
                message: 'Khôi phục sản phẩm thành công!',
                product_data: product
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            validateMongodbId(id)
            const product = await productServices.deleteProduct(id)

            res.status(StatusCodes.OK).json({
                message: 'Sản phẩm đã bị xoá vĩnh viễn!',
                product_data: product
            })
        } catch (error) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
        }
    }
}

export { productControllers }
