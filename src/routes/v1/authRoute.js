import express from 'express'
import { authController } from '~/controllers/authController'
import { validateRegisterData } from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', validateRegisterData, authController.authRegister)

export const authRouter = Router
