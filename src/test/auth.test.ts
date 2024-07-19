import runServer from '../app'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import User from '@schemas/user.schema';
import userModel from '@models/user.model'
import * as userUtils from '@utils/user.utils'
import * as authUtils from '@utils/auth.utils'
import { closeConnection, dbConnection } from './mocks/database/mockdb'

const app = runServer()

let user: any;
let accessToken: string;
let refreshToken: string;
let validRefreshToken: string;

beforeAll(async () => {
    user = await User.create({ username: 'markG', password: 'password123', firstName: faker.person.firstName, lastName: faker.person.lastName, role: 'user'})

    accessToken = authUtils.generateJWTToken(userUtils.convertToBasicInfo(user), 'access').token;
    refreshToken = authUtils.generateJWTToken(userUtils.convertToBasicInfo(user), 'refresh').token;
})

const route = '/auth'

describe('Authentication', () => {
    
    describe('Register', () => {

        const init = () => {
            const spyUserModelFindUserByUsername = jest.spyOn(userModel, 'findUserByUsername');
            const spyUserModelCreateUser = jest.spyOn(userModel, 'createUser');

            return {
                spyUserModelFindUserByUsername,
                spyUserModelCreateUser
            }
        }

        describe('Fail', () => {

            it('Username is required | empty username', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({
                        username: undefined,
                    });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Username is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid Username | not string', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({
                        username: 123,
                    });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Username');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid Username | short username', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({
                        username: 'mark',
                    });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Username');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Username already exists', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'markG' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Username already exists');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Password is required | empty password', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: undefined });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Password is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            })

            it('Invalid Password | short password', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'pass' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Password');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('First Name is required | empty first name', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: undefined });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('First Name is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid First Name | not string', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 123 });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid First Name');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid First Name | short first name', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 'M' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid First Name');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Last Name is required | empty last name', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 'Mark', lastName: undefined });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Last Name is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid Last Name | not string', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 'Mark', lastName: 123 });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Last Name');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });

            it('Invalid Last Name | short last name', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 'Mark', lastName: 'G' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Last Name');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(0);
            });
        });

        describe('Success', () => {
            it('User registered', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/register`)
                    .send({ username: 'mark123', password: 'password123', firstName: 'Mark', lastName: 'Gaje' });

                const { status, message } = response.body;

                expect(status).toBe('success');
                expect(message).toBe('User registered');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelCreateUser).toHaveBeenCalledTimes(1);
            });
        })
    });

    describe('Login', () => {
        
        const init = () => {
            const spyUserModelFindUserByUsername = jest.spyOn(userModel, 'findUserByUsername');
            const spyUtilsConvertToBasicInfo = jest.spyOn(userUtils, 'convertToBasicInfo');
            const spyAuthUtilsGenerateJWTToken = jest.spyOn(authUtils, 'generateJWTToken');

            return {
                spyUserModelFindUserByUsername,
                spyUtilsConvertToBasicInfo,
                spyAuthUtilsGenerateJWTToken
            }
        }
        

        describe('Fail', () => {
            it('Username is required | empty username', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: undefined });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Username is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Invalid Username | not string', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: 123 });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Username');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Invalid Username | short username', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: 'mark' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Username');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Password is required | empty password', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: 'markG', password: undefined });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Password is required');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Invalid Password | short password', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: 'markG', password: '123' });

                const { status, message } = response.body;

                expect(status).toBe('error');
                expect(message).toBe('Invalid Password');
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });
        });

        describe('Success', () => {
            it('User logged in', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/login`)
                    .send({ username: 'mark123', password: 'password123' });

                const { status, message, user, refreshToken } = response.body;

                expect(status).toBe('success');
                expect(message).toBe('User logged in');
                expect(user).toBeDefined();
                expect(refreshToken).toBeDefined();
                expect(mock.spyUserModelFindUserByUsername).toHaveBeenCalledTimes(1);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(1);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(2);

                validRefreshToken = refreshToken
            })
        })
    });

    describe('Refresh Token', () => {
        const init = () => {
            const spyAuthUtilsVerifyJWTToken = jest.spyOn(authUtils, 'verifyJWTToken');
            const spyUserModelValidateRefreshToken = jest.spyOn(userModel, 'validateRefreshToken');
            const spyUtilsConvertToBasicInfo = jest.spyOn(userUtils, 'convertToBasicInfo');
            const spyAuthUtilsGenerateJWTToken = jest.spyOn(authUtils, 'generateJWTToken');

            return {
                spyAuthUtilsVerifyJWTToken,
                spyUserModelValidateRefreshToken,
                spyUtilsConvertToBasicInfo,
                spyAuthUtilsGenerateJWTToken
            }
        }

        describe('Fail', () => {
            it('Invalid token | token is invalid', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/refresh-token`)
                    .send({ refreshToken: 'invalid' });

                const { status, error } = response.body;

                expect(status).toBe('error');
                expect(error).toMatchObject({ name: 'InvalidToken', message: 'Invalid token' })
                expect(mock.spyAuthUtilsVerifyJWTToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelValidateRefreshToken).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Invalid token | token is not a refresh token', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/refresh-token`)
                    .send({refreshToken: accessToken });

                const { status, error } = response.body;

                expect(status).toBe('error');
                expect(error).toMatchObject({ name: 'InvalidToken', message: 'Invalid token' })
                expect(mock.spyAuthUtilsVerifyJWTToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelValidateRefreshToken).toHaveBeenCalledTimes(0);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });

            it('Invalid token | refresh token is expired', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/refresh-token`)
                    .send({refreshToken: refreshToken });

                const { status, error } = response.body;

                expect(status).toBe('error');
                expect(error).toMatchObject({ name: 'InvalidToken', message: 'Invalid token' })
                expect(mock.spyAuthUtilsVerifyJWTToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelValidateRefreshToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(0);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(0);
            });
        });

        describe('Success', () => {
            it('Token refreshed', async () => {
                const mock = init();

                const response = await supertest(app)
                    .post(`${route}/refresh-token`)
                    .send({refreshToken: validRefreshToken });

                const { status, message, user, accessToken } = response.body;

                expect(status).toBe('success');
                expect(message).toBe('Token refreshed');
                expect(user).toBeDefined();
                expect(accessToken).toBeDefined();
                expect(mock.spyAuthUtilsVerifyJWTToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUserModelValidateRefreshToken).toHaveBeenCalledTimes(1);
                expect(mock.spyUtilsConvertToBasicInfo).toHaveBeenCalledTimes(1);
                expect(mock.spyAuthUtilsGenerateJWTToken).toHaveBeenCalledTimes(1);
            });
        });
    })

})