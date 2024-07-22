import { productModel } from '~/models/productModel'

const createProduct = async (productData) => {
    return await productModel.create(productData)
}

const getAllProduct = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const productCount = await productModel.countDocuments({
        product_is_active: true
    })
    const totalPages = Math.ceil(productCount / limit)
    const products = await productModel.find({ product_is_active: true }).skip(skip).limit(limit).sort('-createdAt')

    return {
        productData: products,
        meta: {
            pagination: {
                total: productCount,
                count: products.length,
                per_page: limit,
                current_page: page,
                total_pages: totalPages
            }
        }
    }
}

const getProduct = async (productId) => {
    return await productModel.findByIdAndUpdate(productId, { $inc: { product_views: 1 } }, { new: true })
}

const getProductHidden = async () => {
    return await productModel.find({ product_is_active: false })
}

const searchProductByName = async (searchName) => {
    return await productModel.find({ $text: { $search: searchName } }).sort({ product_views: -1 })
}

const updateProduct = async (productId, productData) => {
    return await productModel.findByIdAndUpdate(productId, productData, { new: true })
}

const hiddenProduct = async (productId) => {
    return await productModel.findByIdAndUpdate(productId, { product_is_active: false }, { new: true })
}

const restoreProduct = async (productId) => {
    return await productModel.findByIdAndUpdate(productId, { product_is_active: true }, { new: true })
}

const deleteProduct = async (productId) => {
    return await productModel.findByIdAndDelete(productId, { new: true })
}

export const productServices = {
    createProduct,
    getAllProduct,
    getProduct,
    getProductHidden,
    searchProductByName,
    updateProduct,
    hiddenProduct,
    deleteProduct,
    restoreProduct
}
