import { userModel } from '~/models/userModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createUser = async (userData) => {
    const existingUser = await userModel.findOne({ user_email: userData.user_email })
    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồn tại, vui lòng thử lại!!')
    }

    const newUser = await userModel.create(userData)

    return {
        message: 'Tạo tài khoản thành công',
        user_data: {
            id: newUser.id,
            user_name: newUser.user_name,
            user_email: newUser.user_email
        }
    }
}

export const authService = {
    createUser
}
