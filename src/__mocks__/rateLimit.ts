import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export default rateLimit({
    windowMs: 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    message: async (req: Request, res: Response) => {
        return {
            status: 'error',
            message: 'Too many requests, please try again after 1 minute.',
        }
    }
})