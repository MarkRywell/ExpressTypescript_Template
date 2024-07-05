import 'module-alias/register'
import runServer from './app'
import { createServer } from 'http'
import config from '@config'
import logger from '@logger';
import socketConnection from '@lib/socket'
import sequelize from '@lib/database'

const app = runServer()
const httpServer = createServer(app)

socketConnection(httpServer)

const HOST: string = config.HOST
const PORT: number = config.PORT


sequelize.authenticate()
    .then(async () => {
        logger.info('Database Connection Successful', 'database')
        await sequelize.sync({ alter: true })
        httpServer.listen(PORT, () => {
            logger.info(`APP RUNNING AT (HOST: ${HOST}|PORT: ${PORT})`, 'server')
        })
    })
    .catch((error: Error) => {
      logger.error('\x1b[31m%s\x1b[0m', 'Database Connection Error!', error)
        process.exit(1);
    });
