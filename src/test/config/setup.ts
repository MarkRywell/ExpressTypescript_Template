import { closeConnection, dbConnection } from '../mocks/database/mockdb'

beforeAll(async () => {
  await dbConnection()
})

afterAll(async () => {
  await closeConnection()
})