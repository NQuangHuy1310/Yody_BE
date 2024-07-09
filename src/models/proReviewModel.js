import mongoose from 'mongoose'

const ProReviewSchema = new mongoose.Schema(
    {
        review_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        review_posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        review_comment: {
            type: String,
            required: true
        },
        review_star: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
)

export const proReviewSchema = mongoose.model('ProReviewSchema', ProReviewSchema)
