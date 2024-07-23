import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema(
    {
        variant_product_code: {
            type: String,
            required: true,
            index: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        product_color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
            index: true
        },
        product_size: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Size',
            index: true
        },
        variant_product_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        variant_product_image: [
            {
                public_id: String,
                url: String
            }
        ],
        variant_is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export const variantModel = mongoose.model('Variant', variantSchema)
