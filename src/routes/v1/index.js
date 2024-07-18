import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from '~/routes/v1/authRoute'
import { proCatRouter } from '~/routes/v1/productCatRoute'
import { uploadRouter } from '~/routes/v1/uploadRoute'

const Router = express.Router()

// Check APIs V1/status
Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use!' })
})

// APIs
Router.use('/auth', authRouter)
Router.use('/categories', proCatRouter)
Router.use('/upload', uploadRouter)

export const APIs_V1 = Router
