import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authServices'

const authRegister = async (req, res, next) => {
    try {
        const { user_email, user_password, user_name } = req.body
        const user = await authService.createUser({ user_email, user_password, user_name })

        res.status(StatusCodes.CREATED).json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const authController = { authRegister }
