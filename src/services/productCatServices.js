import { categoryModel } from '~/models/categoryModel'

const createCategory = async (categoryData) => {
    return await categoryModel.create(categoryData)
}

const getAllCategory = async () => {
    return await categoryModel.find({ category_is_active: true }).populate('category_parent_id')
}

const getCategoryById = async (categoryId) => {
    return await categoryModel.find({ _id: categoryId, category_is_active: true })
}

const updateCategory = async (categoryId, categoryData) => {
    return await categoryModel.findByIdAndUpdate(categoryId, categoryData, { new: true })
}

const hiddenCategory = async (categoryId) => {
    return await categoryModel.findByIdAndUpdate(categoryId, { category_is_active: false }, { new: true })
}

export const productCatService = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    hiddenCategory
}
