import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        product_slug: {
            type: String,
            required: true,
            index: true
        },
        product_description: {
            type: String,
            required: true,
            index: true
        },
        product_price: {
            type: Number,
            required: true,
            index: true,
            default: 0
        },
        product_price_sale: {
            type: Number,
            default: 0
        },
        product_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        product_sold: {
            type: Number,
            required: true,
            default: 0
        },
        product_available: {
            type: Number,
            required: true,
            default: 0
        },
        product_warranty: {
            type: String
        },
        product_thumbnail: {
            public_id: String,
            url: String
        },
        product_views: {
            type: Number,
            default: 0
        },
        product_tags: {
            type: [String],
            default: [],
            index: true
        },
        product_rating: Number,
        product_is_active: {
            type: Boolean,
            default: true,
            index: true
        },
        product_variants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variant'
            }
        ],
        product_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
)

export const productModel = mongoose.model('Product', productSchema)
