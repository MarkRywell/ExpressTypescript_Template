import { CONFIG } from '@interfaces/global'
require('dotenv').config()

const config: CONFIG = {
    HOST: String(process.env.HOST) ?? 'localhost',
    PORT: Number(process.env.PORT),
    ENV: String(process.env.ENV),
    ACCESS_KEY: String(process.env.TOKEN_KEY),
    REFRESH_KEY: String(process.env.REFRESH_KEY),
    MONGODB: {
        MONGODB_USERNAME: String(process.env.MONGODB_USERNAME),
        MONGODB_PASSWORD: String(process.env.MONGODB_PASSWORD),
        MONGODB_APP: String(process.env.MONGODB_APP),
        MONGODB_URI: String(process.env.MONGODB_URI),
        MONGODB_IP: String(process.env.MONGODB_IP)
    },
    GOOGLE: {
        GOOGLE_EMAIL: String(process.env.GOOGLE_EMAIL),
        GOOGLE_PRIVATE_KEY: String(process.env.GOOGLE_PRIVATE_KEY)
    }
}

export default config;