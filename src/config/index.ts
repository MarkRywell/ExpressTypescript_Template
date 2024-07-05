import { CONFIG } from '@interfaces/global'
require('dotenv').config()

const config: CONFIG = {
    HOST: String(process.env.HOST) ?? 'localhost',
    PORT: Number(process.env.PORT),
    ENV: String(process.env.ENV),
    ACCESS_KEY: String(process.env.TOKEN_KEY),
    REFRESH_KEY: String(process.env.REFRESH_KEY),
    MYSQL: {
        MYSQL_DATABASE: String(process.env.MYSQL_DATABASE),
        MYSQL_USERNAME: String(process.env.MYSQL_USERNAME),
        MYSQL_PASSWORD: String(process.env.MYSQL_PASSWORD)
    }
}

export default config;