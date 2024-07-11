import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

export const generateRefreshToken = (id) => {
    return jwt.sign({ id }, env.REFRESH_JWT_SECRET, { expiresIn: '7d' })
}

export const decodeRefreshToken = (token) => {
    return jwt.verify(token, env.REFRESH_JWT_SECRET)
}
