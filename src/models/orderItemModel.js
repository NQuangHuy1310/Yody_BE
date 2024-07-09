import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
    {
        ord_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        ord_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true
        },
        ord_variant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variant',
            required: true,
            index: true
        },
        ord_quantity: {
            type: Number,
            required: true,
            default: 1
        }
    },
    {
        timestamps: true
    }
)

export const orderItemModel = mongoose.model('OrderItem', orderItemSchema)
