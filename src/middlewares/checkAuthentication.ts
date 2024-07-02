import { Request, Response, NextFunction } from 'express';
import { verifyJWTToken } from '@utils/auth.utils';

const publicPaths = [
    '/auth/register',
    '/auth/login',
    '/auth',
    '/ws',
    '/ws/'
];

const isPublicPath = (path: string) => {

    return publicPaths.some((publicPath) => (publicPath === path || (publicPath + '/') === path));
};

export default (req: Request, res: Response, next: NextFunction) => {

    const errorMessage = 'Invalid Token'

    if (isPublicPath(req.path)) return next();

    try {
        if (!req.headers) throw errorMessage;

        const bearerToken: string = String(req.headers.authorization);

        if (!bearerToken.includes('Bearer')) throw errorMessage;

        const decodeToken: any = verifyJWTToken(bearerToken.split(' ')[1]);

        req.query.userData = decodeToken.userConfig;
        req.query.userId = decodeToken.userConfig._id;

        return next();
    } catch (err) {
        return res.status(401).send({
            status: 'error',
            error: Object(err),
        });
    }
};
