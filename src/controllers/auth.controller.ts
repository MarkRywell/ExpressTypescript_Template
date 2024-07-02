import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userModel from '@models/user.model';
import { convertToBasicInfo } from '../utils/user.utils';
import { generateJWTToken, verifyJWTToken } from '../utils/auth.utils';

export default {
    register: async (req: Request, res: Response) => {

        const data = req.body;

        await userModel.createUser({
            ...data,
            role: 'user'
        });

        return {
            message: "User registered",
        }
    },

    login: async (req: Request, res: Response) => {

        const { username, password } = req.body;

        const user = await userModel.findUserByUsername(username);

        if(!user) throw 'User not found';

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordMatch) throw 'Invalid password';

        const userInfo = convertToBasicInfo(user);

        const { token: refreshToken } = generateJWTToken(userInfo, 'refresh');

        const { token: accessToken, expiryAt } = generateJWTToken(userInfo);

        user.refreshToken = refreshToken;

        await user.save();

        return {
            message: "User logged in",
            user: userInfo,
            accessToken,
            refreshToken,
            expiryAt
        }
    },

    refreshToken: async (req: Request, res: Response) => {

        const { refreshToken } = req.body;

        const invalidTokenError = {
            name: 'InvalidToken',
            message: 'Invalid token',
        };

        try {
            const { userConfig }: any = verifyJWTToken(refreshToken, 'refresh')

            const user = await userModel.validateRefreshToken(userConfig._id, refreshToken);

            if(!user) throw invalidTokenError;

            const userInfo = convertToBasicInfo(user);

            const { token: newRefreshToken } = generateJWTToken(userInfo, 'refresh');

            user.refreshToken = newRefreshToken;

            await user.save();

            const { token: accessToken, expiryAt } = generateJWTToken(userInfo, 'access');

            return {
                message: "Token refreshed",
                user: userInfo,
                accessToken,
                refreshToken: newRefreshToken,
                expiryAt
            }
        }
        catch(error: any) {
            if (error.name === 'JsonWebTokenError') error = invalidTokenError;

            return res.status(401).send({
                status: 'error',
                error: Object(error),
            });
        }
    },
}