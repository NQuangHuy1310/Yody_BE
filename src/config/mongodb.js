/* eslint-disable no-console */
import mongoose from 'mongoose'
import { env } from '~/config/environment'

const dbConnection = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log('Database Connected Error')
    }
}

export default dbConnection
