import express from 'express'
import { authControllers } from '~/controllers/authController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateLoginData, validateRegisterData } from '~/validations/authValidation'

const Router = express.Router()

// Random user data
Router.get('/generate-fake-data', authControllers.createRandomUser)

//user
Router.post('/register', validateRegisterData, authControllers.authRegister)
    .post('/login', validateLoginData, authControllers.authLogin)
    .post('/logout', authMiddleware, authControllers.authLogout)
    .get('/account/me', authMiddleware, authControllers.getMe)
    .put('/account/me', authMiddleware, authControllers.updateMe)

// Admin
Router.get('/users', authControllers.getUsers)
    .get('/admins', authMiddleware, isAdmin, authControllers.getAdmins)
    .patch('/:id/block', authMiddleware, isAdmin, authControllers.blockUser)
    .patch('/:id/unblock', authMiddleware, isAdmin, authControllers.unBlockUser)
    .delete('/:id', authMiddleware, isAdmin, authControllers.hiddenUser)

export const authRouter = Router
