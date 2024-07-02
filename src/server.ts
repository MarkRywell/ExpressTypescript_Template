import 'module-alias/register'
import runServer from './app'
import { createServer } from 'http'
import config from '@config'
import DBConnection from '@lib/mongodb'
import logger from '@logger';
import socketConnection from '@lib/socket'

const app = runServer()
const httpServer = createServer(app)

socketConnection(httpServer)

const HOST: string = config.HOST
const PORT: number = config.PORT

httpServer.listen(PORT, () => {
  logger.info(`Listening to port ${HOST}:${PORT}`, 'server');
})


// DBConnection((error: any) => {
//   if (!error) {
//     httpServer.listen(PORT, () => {
//       logger.info(`Listening to port ${HOST}:${PORT}`, 'server');
//     })
//   } else {
//     logger.error('\x1b[31m%s\x1b[0m', 'Database Connection Error!')
//   }
// })