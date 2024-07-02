import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export default (validations: ValidationChain[]) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        for (let validation of validations) {
            const result: any = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(200).json({
            status: 'error',
            message: errors.array()[0].msg,
        });
    };
};
