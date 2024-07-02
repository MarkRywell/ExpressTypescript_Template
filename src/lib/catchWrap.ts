import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';

export default (func: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors: Result<ValidationError> = validationResult(req);
            if (!errors.isEmpty()) {
                const [error] = errors.array();
                let errorMessage = error.msg;
                const errorList: any = [];
                errors.array().forEach((err: any) => {
                    if (err.nestedErrors) {
                        err.nestedErrors.forEach((nestedErr: any) => {
                            if (nestedErr.value) {
                                errorList.push(nestedErr);
                                errorMessage = nestedErr.msg;
                            }
                        });
                    } else errorList.push(err);
                });
                return res.send({
                    status: 'error',
                    message: errorMessage,
                });
            }

            const response = await func.call(this, req, res, next);
            if (response?.req) return response;
            return res.send({
                status: 'success',
                ...response,
            });
        } catch (e: any) {
            let errorResponse = {
                status: 'error',
                message: 'Something went wrong',
                error: Object(e),
            };

            if (typeof e === 'object') {
                errorResponse = {
                    ...errorResponse,
                    ...e,
                };
            }
            return res.send(errorResponse);
        }
    };