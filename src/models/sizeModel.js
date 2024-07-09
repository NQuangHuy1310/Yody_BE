import mongoose from 'mongoose'

const sizeSchema = new mongoose.Schema(
    {
        size_name: {
            type: String,
            required: true,
            trim: true
        },
        size_code: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export const sizeModel = mongoose.model('Size', sizeSchema)
