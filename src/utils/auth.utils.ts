import bcrypt from 'bcrypt';
import config from '@config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomSanitizer, CustomValidator } from "express-validator";

const encryptPassword: CustomSanitizer = async (value) => {
    return await bcrypt.hash(value, 10);
}

const generateJWTToken = (userConfig: any, type: 'access' | 'refresh' = 'access') => {

    const expiryHours = type === 'access' ? 4 : 24; // 4 hours for access token, 1 day for refresh token

    const expiryAt = Math.floor(Date.now() / 1000) + 60 * (60 * expiryHours); // 4 hours

    const secretKey = type === 'access' ? config.ACCESS_KEY : config.REFRESH_KEY;
    const payload: any = { userConfig, exp: expiryAt };
    return {
        token: jwt.sign(payload, String(secretKey)),
        expiryAt,
    };
}

const verifyJWTToken = (token: string, type: 'access' | 'refresh' = 'access') => {
    return jwt.verify(
        token,
        type === 'access' ? String(config.ACCESS_KEY) : String(config.REFRESH_KEY)
    );
};

export {
    encryptPassword,
    generateJWTToken,
    verifyJWTToken
}