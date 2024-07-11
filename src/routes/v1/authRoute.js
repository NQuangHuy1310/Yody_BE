import express from 'express'
import { authController } from '~/controllers/authController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { validateLoginData, validateRegisterData } from '~/validations/authValidation'

const Router = express.Router()

// Random user data
Router.get('/generate-fake-data', authController.createRandomUser)

//user
Router.post('/register', validateRegisterData, authController.authRegister)
Router.post('/login', validateLoginData, authController.authLogin)
Router.post('/logout', authMiddleware, authController.authLogout)
Router.get('/account/me', authMiddleware, authController.getMe)
Router.put('/account/me', authMiddleware, authController.updateMe)

// Admin
Router.get('/users', authController.getUsers)
Router.get('/admins', authMiddleware, isAdmin, authController.getAdmins)
Router.patch('/:id/block', authMiddleware, isAdmin, authController.blockUser)
Router.patch('/:id/unblock', authMiddleware, isAdmin, authController.unBlockUser)
Router.delete('/:id', authMiddleware, isAdmin, authController.hiddenUser)

export const authRouter = Router
