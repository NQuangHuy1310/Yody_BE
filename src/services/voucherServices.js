import { voucherModel } from '~/models/voucherModel'

const createVoucher = async (voucherData) => {
    return await voucherModel.create(voucherData)
}

const getVouchersActive = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const voucherCount = await voucherModel.countDocuments({
        voucher_is_active: true
    })
    const totalPages = Math.ceil(voucherCount / limit)
    const vouchers = await voucherModel.find({ voucher_is_active: true }).skip(skip).limit(limit).sort('-createdAt')

    return {
        voucherData: vouchers,
        meta: {
            pagination: {
                total: voucherCount,
                count: vouchers.length,
                par_page: limit,
                current_page: page,
                total_page: totalPages
            }
        }
    }
}

const getVouchersHidden = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const voucherCount = await voucherModel.countDocuments({
        voucher_is_active: false
    })
    const totalPages = Math.ceil(voucherCount / limit)
    const vouchers = await voucherModel.find({ voucher_is_active: false }).skip(skip).limit(limit).sort('-createdAt')

    return {
        voucherData: vouchers,
        meta: {
            pagination: {
                total: voucherCount,
                count: vouchers.length,
                par_page: limit,
                current_page: page,
                total_page: totalPages
            }
        }
    }
}

const getVoucher = async (voucherId) => {
    return await voucherModel.findById(voucherId)
}

const searchVoucherByName = async (searchName) => {
    return await voucherModel.find({ $text: { $search: searchName }, voucher_is_active: true })
}

const updateVoucher = async (voucherId, voucherData) => {
    return await voucherModel.findByIdAndUpdate(voucherId, voucherData, { new: true })
}

const hiddenVoucher = async (voucherId) => {
    return await voucherModel.findByIdAndUpdate(voucherId, { voucher_is_active: false }, { new: true })
}

const deleteVoucher = async (voucherId) => {
    return await voucherModel.findByIdAndDelete(voucherId, { new: true })
}

export const voucherServices = {
    createVoucher,
    getVouchersActive,
    getVouchersHidden,
    getVoucher,
    searchVoucherByName,
    updateVoucher,
    hiddenVoucher,
    deleteVoucher
}
