import { sizeModel } from '~/models/sizeModel'

const createSize = async (sizeData) => {
    return await sizeModel.create(sizeData)
}

const getAllSize = async () => {
    return await sizeModel.find({ size_is_active: true })
}

const getSizeById = async (sizeId) => {
    return await sizeModel.find({ _id: sizeId, size_is_active: true })
}

const updateSize = async (sizeId, sizeData) => {
    return await sizeModel.findByIdAndUpdate(sizeId, sizeData, { new: true })
}

const hiddenSize = async (sizeId) => {
    return await sizeModel.findByIdAndUpdate(sizeId, { size_is_active: false }, { new: true })
}

export const sizeService = {
    createSize,
    getAllSize,
    getSizeById,
    updateSize,
    hiddenSize
}
