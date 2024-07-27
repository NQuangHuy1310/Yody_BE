import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
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
            //  Tỉnh - Thành phố
            type: String,
            required: true
        },
        address_district: {
            // Quận - huyện
            type: String,
            required: true
        },
        address_ward: {
            // Phường - xã
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export const addressModel = mongoose.model('Address', addressSchema)
