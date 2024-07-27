import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true
        },
        user_email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        user_password: {
            type: String,
            required: true,
            minLength: 8
        },
        user_role: {
            type: String,
            enum: ['admin', 'user', 'staff'],
            default: 'user'
        },
        user_avatar: {
            public_id: String,
            url: String
        },
        user_birthday: {
            type: Date
        },
        user_gender: {
            type: String,
            enum: ['Nam', 'Nữ', 'Khác']
        },
        is_blocked: {
            type: Boolean,
            default: false
        },
        email_verification_code: String, // * mã code để xác thực email
        email_verification_date: Date, // * Thời gian hết hạn xác thực
        email_verified: {
            type: Boolean,
            default: false
        },
        refresh_token: String,
        is_active: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)
userSchema.static('isEmailTaken', async function isEmailTaken(email, excludeUserId) {
    const user = await this.findOne({ user_email: email, _id: { $ne: excludeUserId } })

    return !!user
})

userSchema.pre('save', async function (next) {
    const user = this
    const salt = await bcrypt.genSalt(10)
    if (user.isModified('user_password')) {
        user.user_password = await bcrypt.hash(user.user_password, salt)
    }
    next()
})

userSchema.methods.comparePassword = async function (user_password) {
    const user = this

    return bcrypt.compare(user_password, user.user_password)
}

export const userModel = mongoose.model('User', userSchema)
