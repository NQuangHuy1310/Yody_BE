import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authServices'
import ApiError from '~/utils/ApiError'
import { generateToken } from '~/utils/jwtToken'
import { generateRefreshToken } from '~/utils/refreshToken'
import validateMongodbId from '~/utils/validateMongodbId'

const authRegister = async (req, res, next) => {
    try {
        const { user_email, user_password, user_name } = req.body
        const user = await authService.createUser({ user_email, user_password, user_name })

        res.status(StatusCodes.CREATED).json({
            message: 'Tạo tài khoản thành công!',
            user_data: {
                id: user.id,
                user_name: user.user_name,
                user_email: user.user_email
            }
        })
    } catch (error) {
        next(error)
    }
}

const authLogin = async (req, res, next) => {
    try {
        const { user_email, user_password } = req.body
        const user = await authService.loginUser(user_email, user_password)
        const refreshToken = generateRefreshToken(user?.id)
        await authService.updateRefreshToken(user?.id, refreshToken)
        const token = generateToken(user?.id)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 7
        })

        res.status(StatusCodes.OK).json({
            message: 'Đăng nhập thành công!',
            user_data: {
                id: user.id,
                user_name: user.user_name,
                user_email: user.user_email,
                user_avatar: user.user_avatar,
                access_token: token
            }
        })
    } catch (error) {
        next(error)
    }
}

const authLogout = async (req, res, next) => {
    try {
        const cookie = req.cookies
        if (!cookie.refreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không có refresh token trong Cookies')
        const refreshToken = cookie.refreshToken
        const user = await authService.verifyRefreshToken(refreshToken)

        if (!user) {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true
            })
            return res.status(StatusCodes.FORBIDDEN)
        }
        await authService.logoutUser(user.id)

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        })

        res.status(StatusCodes.OK).json({
            message: 'Đăng xuất tài khoản thành công!'
        })
    } catch (error) {
        next()
    }
}

const getMe = async (req, res, next) => {
    try {
        const { _id } = req.user
        validateMongodbId(_id)
        const user = await authService.getMe(_id)

        res.status(StatusCodes.OK).json({
            message: 'Lấy thông tin thành công!',
            user_data: user
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const updateMe = async (req, res, next) => {
    try {
        const { _id } = req.user
        validateMongodbId(_id)
        const user = await authService.updateMe(_id, req.body)
        res.status(StatusCodes.OK).json({
            message: 'Cập nhật thông tin thành công!',
            user_data: user
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const userData = await authService.getAllUser(page, limit)
        res.status(StatusCodes.OK).json({
            message: 'Lấy dữ liệu thành công!',
            userData
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const getAdmins = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const userData = await authService.getAllAdmin(page, limit)
        res.status(StatusCodes.OK).json({
            message: 'Lấy dữ liệu thành công!',
            userData
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const blockUser = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongodbId(id)
        await authService.blockUser(id)

        res.status(StatusCodes.OK).json({
            message: 'Chặn người dùng thành công!'
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const unBlockUser = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongodbId(id)
        await authService.unBlockUser(id)

        res.status(StatusCodes.OK).json({
            message: 'Bỏ chặn người dùng thành công!'
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

const hiddenUser = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongodbId(id)
        await authService.hiddenUser(id)

        res.status(StatusCodes.OK).json({
            message: 'Xoá người dùng thành công!'
        })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau!'))
    }
}

// * Fake data
const createRandomUser = async (req, res, next) => {
    try {
        await authService.generateUserData()
        res.status(200).json({ message: 'Fake data created successfully' })
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi phía server, vui lòng thử lại sau'))
    }
}

export const authController = {
    authRegister,
    authLogin,
    authLogout,
    getMe,
    updateMe,
    getUsers,
    getAdmins,
    blockUser,
    unBlockUser,
    hiddenUser,
    createRandomUser
}
