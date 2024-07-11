import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { authService } from '~/services/authServices'
import ApiError from '~/utils/ApiError'

const authMiddleware = async (req, res, next) => {
    let token
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET)
            const user = await authService.getUserById(decoded?.id)
            req.user = user
            next()
        } catch (error) {
            next(new ApiError(StatusCodes.UNAUTHORIZED, 'Phiên đăng nhập của bạn đã hết hạn, Vui lòng đăng nhập lại!'))
        }
    } else {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Phiên đăng nhập của bạn đã hết hạn, Vui lòng đăng nhập lại!'))
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (user.user_role === 'admin') {
            next()
        } else {
            next(new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn không phải là Admin'))
        }
    } catch (error) {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Phiên đăng nhập của bạn đã hết hạn, Vui lòng đăng nhập lại!'))
    }
}

export { authMiddleware, isAdmin }
