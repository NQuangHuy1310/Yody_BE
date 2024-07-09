import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        category_slug: {
            type: String,
            required: true
        },
        category_image: {
            public_id: String,
            url: String
        },
        category_is_parent: {
            type: Boolean,
            default: false
        },
        category_parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            index: true
        },
        category_children_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                index: true
            }
        ],
        category_is_active: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    {
        timestamps: true
    }
)

export const categoryModel = mongoose.model('Category', categorySchema)
