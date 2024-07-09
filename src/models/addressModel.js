import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
    {
        address_full_name: {
            type: String,
            required: true
        },
        address_phone_number: {
            type: String,
            required: true,
            minlength: 10
        },
        address_location: {
            type: String,
            required: true
        },
        address_city: {
            type: String,
            required: true
        },
        address_district: {
            type: String,
            required: true
        },
        address_ward: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export const addressModel = mongoose.model('Address', addressSchema)
