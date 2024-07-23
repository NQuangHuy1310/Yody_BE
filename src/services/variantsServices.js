import { variantModel } from '~/models/proVariantModel'

const createVariant = async (variantData) => {
    return await variantModel.create(variantData)
}

const getVariantsByProductId = async (productId) => {
    return await variantModel
        .find({ product_id: productId, variant_is_active: true })
        .populate('product_color product_size', 'color_name color_code size_name size_code')
        .select('product_color product_size variant_product_quantity variant_product_image')
}

const getVariant = async (variantId) => {
    return await variantModel.find({ _id: variantId, variant_is_active: true })
}

const updateVariant = async (variantId, variantData) => {
    return await variantModel.findByIdAndUpdate(variantId, variantData, { new: true })
}

const hiddenVariant = async (variantId) => {
    return await variantModel.findByIdAndUpdate(variantId, { variant_is_active: false }, { new: true })
}

const restoreVariant = async (variantId) => {
    return await variantModel.findByIdAndUpdate(variantId, { variant_is_active: true }, { new: true })
}

const deleteVariant = async (variantId) => {
    return await variantModel.findByIdAndDelete(variantId, { new: true })
}

export const variantServices = {
    createVariant,
    getVariantsByProductId,
    getVariant,
    updateVariant,
    hiddenVariant,
    restoreVariant,
    deleteVariant
}
