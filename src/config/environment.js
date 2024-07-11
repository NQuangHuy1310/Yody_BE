import 'dotenv/config'

export const env = {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,

    MONGODB_URI: process.env.MONGODB_URI,

    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET
}
