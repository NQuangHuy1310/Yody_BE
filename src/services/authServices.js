import { StatusCodes } from 'http-status-codes'
import { faker } from '@faker-js/faker'

import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'

const createUser = async (userData) => {
    const existingUser = await userModel.findOne({ user_email: userData.user_email })
    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồn tại, vui lòng thử lại!!')
    }

    const newUser = await userModel.create(userData)

    return newUser
}

const loginUser = async (user_email, user_password) => {
    const user = await userModel.findOne({ user_email: user_email })

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Tài khoản không tồn tại!!')
    }

    const isPasswordCorrect = await user.comparePassword(user_password)
    if (!isPasswordCorrect) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Mật khẩu không đúng !!')
    }

    if (user.is_blocked || !user.is_active) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Tài khoản của bạn đã bị khoá, vui lòng liên hệ với admin để xử lý!!'
        )
    }

    return user
}

const logoutUser = async (userId) => {
    try {
        return userModel.findOneAndUpdate({ _id: userId }, { refresh_token: '' })
    } catch (error) {
        throw new ApiError(StatusCodes.FORBIDDEN, error.message)
    }
}

const updateRefreshToken = async (userId, refreshToken) => {
    return await userModel.findOneAndUpdate({ _id: userId }, { refresh_token: refreshToken })
}

const verifyRefreshToken = async (refreshToken) => {
    try {
        const user = await userModel.findOne({ refresh_token: refreshToken })
        if (!user) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'Tài khoản không tồn tại!!')
        }

        return user
    } catch (error) {
        throw new ApiError(StatusCodes.FORBIDDEN, error.message)
    }
}

const getUserById = async (userId) => {
    return await userModel.findById(userId).select('-user_password')
}

const getMe = async (userId) => {
    return await userModel.findById(userId).select('-user_password -refresh_token')
}

const updateMe = async (userId, userData) => {
    return await userModel
        .findByIdAndUpdate(
            userId,
            {
                user_name: userData?.user_name,
                user_avatar: userData?.user_avatar,
                user_birthday: userData?.user_birthday,
                user_gender: userData?.user_gender
            },
            { new: true }
        )
        .select('-user_password -refresh_token')
}

const getAllUser = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const userCount = await userModel.countDocuments({
        user_role: 'user',
        is_blocked: false
    })

    const totalPages = Math.ceil(userCount / limit)
    const users = await userModel
        .find({ user_role: 'user', is_blocked: false })
        .select('-user_password -refresh_token')
        .skip(skip)
        .limit(limit)

    return {
        userData: users,
        meta: {
            pagination: {
                total: userCount,
                count: users.length,
                per_page: limit,
                current_page: page,
                total_pages: totalPages
            }
        }
    }
}

const getAllAdmin = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const userCount = await userModel.countDocuments({
        user_role: 'admin',
        is_blocked: false
    })
    const totalPages = Math.ceil(userCount / limit)
    const users = await userModel
        .find({ user_role: 'admin', is_blocked: false })
        .select('-user_password -refresh_token')
        .skip(skip)
        .limit(limit)

    return {
        userData: users,
        meta: {
            pagination: {
                total: userCount,
                count: users.length,
                per_page: limit,
                current_page: page,
                total_pages: totalPages
            }
        }
    }
}

const blockUser = async (userId) => {
    return await userModel.findByIdAndUpdate(userId, { is_blocked: true }, { new: true })
}

const unBlockUser = async (userId) => {
    return await userModel.findByIdAndUpdate(userId, { is_blocked: false }, { new: true })
}

const hiddenUser = async (userId) => {
    return await userModel.findByIdAndUpdate(userId, { is_active: false }, { new: true })
}

// General user data
const generateUserData = async () => {
    return await Promise.all(
        Array.from({ length: 50 }, async () => {
            const userData = {
                user_name: faker.internet.userName(),
                user_email: faker.internet.email(),
                user_password: faker.internet.password(),
                user_birthday: faker.date.birthdate()
            }
            const newUser = new userModel(userData)
            await newUser.save()
            return newUser
        })
    )
}

export const authService = {
    createUser,
    loginUser,
    updateRefreshToken,
    verifyRefreshToken,
    logoutUser,
    getUserById,
    getMe,
    updateMe,
    getAllUser,
    getAllAdmin,
    blockUser,
    unBlockUser,
    hiddenUser,
    generateUserData
}
