import mongoose from 'mongoose'

const voucherSchema = new mongoose.Schema(
    {
        voucher_name: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        voucher_discount: {
            type: Number,
            required: true,
            default: 0,
            index: true
        },
        voucher_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        voucher_used: {
            type: Number,
            default: 0
        },
        voucher_start_date: {
            type: Date,
            required: true
        },
        voucher_end_date: {
            type: Date,
            required: true
        },
        voucher_is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

voucherSchema.index({ voucher_name: 'text' })

export const voucherModel = mongoose.model('Voucher', voucherSchema)
