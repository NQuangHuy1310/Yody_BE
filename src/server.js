/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { env } from '~/config/environment'
import dbConnection from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingDiddleware'

// config
const app = express()
app.use(
    cors({
        credentials: true
    })
)
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to mongodb
dbConnection()

// V1 APIs routes
app.use('/api/v1', APIs_V1)

app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${env.APP_PORT}`)
})
