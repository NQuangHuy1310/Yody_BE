import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema(
    {
        color_name: {
            type: String,
            required: true,
            trim: true
        },
        color_image: {
            public_id: String,
            url: String
        },
        color_code: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export const colorModel = mongoose.model('Color', colorSchema)
