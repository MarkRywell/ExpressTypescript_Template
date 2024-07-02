import runServer from '../app'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import User from '@schemas/user.schema';
import userModel from '@models/user.model'
import * as userUtils from '@utils/user.utils'
import { closeConnection, dbConnection } from './mocks/database/mockdb'

const app = runServer()

beforeAll(async () => {
    await dbConnection()

    
})

afterAll(async () => {
    await closeConnection()
})

const route = '/user'

describe('User', () => {
    it('test sum of 1 + 1', () => {
        expect(1 + 1).toBe(2)
    })
})