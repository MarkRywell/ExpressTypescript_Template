import { closeConnection } from '../mocks/database/mockdb'

export default async () => {
  closeConnection()
}
