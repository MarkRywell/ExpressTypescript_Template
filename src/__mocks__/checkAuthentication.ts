import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.userId) req.query.userId = '62e77ffdf9a7cc27168843ff';
    if (!req.query.isGameMaster) req.query.isGameMaster = 'true';
    return next();
};