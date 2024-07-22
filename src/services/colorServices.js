import { colorModel } from '~/models/colorModel'

const createColor = async (colorData) => {
    return await colorModel.create(colorData)
}

const getAllColor = async () => {
    return await colorModel.find({ color_is_active: true })
}

const getColorById = async (colorId) => {
    return await colorModel.find({ _id: colorId, color_is_active: true })
}

const updateColor = async (colorId, colorData) => {
    return await colorModel.findByIdAndUpdate(colorId, colorData, { new: true })
}

const hiddenColor = async (colorId) => {
    return await colorModel.findByIdAndUpdate(colorId, { color_is_active: false }, { new: true })
}

export const colorService = {
    createColor,
    getAllColor,
    getColorById,
    updateColor,
    hiddenColor
}
