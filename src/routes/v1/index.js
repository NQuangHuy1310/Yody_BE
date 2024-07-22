import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRouter } from '~/routes/v1/authRoute'
import { colorRoute } from '~/routes/v1/colorRoute'
import { proCatRouter } from '~/routes/v1/productCatRoute'
import { productRouter } from '~/routes/v1/productRoute'
import { sizeRoute } from '~/routes/v1/sizeRoute'
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
Router.use('/colors', colorRoute)
Router.use('/sizes', sizeRoute)
Router.use('/products', productRouter)

export const APIs_V1 = Router
