import { StatusCodes } from 'http-status-codes'
import { productCatService } from '~/services/productCatService'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/fomatters'
import validateMongodbId from '~/utils/validateMongodbId'

const createProCat = async (req, res, next) => {
    try {
        const { category_name, category_parent_id } = req.body
        const slug = slugify(category_name)

        const productCat = await productCatService.createCategory({
            category_name: category_name,
            category_slug: slug,
            category_parent_id
        })

        res.status(StatusCodes.CREATED).json({
            message: 'Tạo danh mục thành công',
            data: productCat
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await productCatService.getAllCategory()

        res.status(StatusCodes.OK).json({
            message: 'Lấy danh mục thành công',
            data: categories
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { category_name, category_parent_id } = req.body
        const { id } = req.params
        const slug = slugify(category_name)

        const updatedCategory = await productCatService.updateCategory(id, {
            category_name: category_name,
            category_slug: slug,
            category_parent_id
        })

        res.status(StatusCodes.OK).json({
            message: 'Cập nhật danh mục thành công',
            data: updatedCategory
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

export const hiddenCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongodbId(id)

        const hiddenCategory = await productCatService.hiddenCategory(id)

        res.status(StatusCodes.OK).json({
            message: 'Xoá danh mục thành công',
            data: hiddenCategory
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

export const proCatController = {
    createProCat,
    getCategories,
    updateCategory,
    hiddenCategory
}
