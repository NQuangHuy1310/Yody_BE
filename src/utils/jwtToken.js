import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

export const generateToken = (id) => {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '30m' })
}
