import { addressModel } from '~/models/addressModel'

const createAddress = async (addressData) => {
    return await addressModel.create(addressData)
}

const getAddressByUserId = async (userId) => {
    return await addressModel.find({ user_id: userId })
}

const getAddressById = async (addressId) => {
    return await addressModel.findById(addressId)
}

const updateAddress = async (addressId, addressData) => {
    return await addressModel.findByIdAndUpdate(addressId, addressData, { new: true })
}

const deleteAddress = async (addressId) => {
    return await addressModel.findByIdAndDelete(addressId, { new: true })
}

export const addressServices = {
    createAddress,
    getAddressByUserId,
    getAddressById,
    updateAddress,
    deleteAddress
}
