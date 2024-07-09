import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
    {
        cart_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cart_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        cart_product_variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variant',
            required: true
        },
        cart_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        cart_total_price: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
)

export const cartModel = mongoose.model('Cart', cartSchema)
