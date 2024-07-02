import { Router } from "express";
import authController from "@controllers/auth.controller";
import validateChain from "@lib/validateChain";
import { body } from "express-validator";
import catchWrap from "@lib/catchWrap";
import rateLimiter from "@lib/rateLimit";
import { checkUsername } from "@utils/route-validator";
import { encryptPassword } from "@utils/auth.utils";

const router = Router();

router.post('/register',
    rateLimiter,
    validateChain([
        body('username', 'Invalid Username')
            .notEmpty().withMessage('Username is required')
            .isString()
            .isLength({ min: 5, max: 20 })
            .bail()
            .custom(checkUsername),
        body('password', 'Invalid Password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8, max: 20 })
            .bail()
            .customSanitizer(encryptPassword),
        body('firstName', 'Invalid First Name')
            .notEmpty().withMessage('First Name is required')
            .isString()
            .isLength({ min: 2, max: 20 }),
        body('lastName', 'Invalid Last Name')
            .notEmpty().withMessage('Last Name is required')
            .isString()
            .isLength({ min: 2, max: 20 }),
    ]),
    catchWrap(authController.register)
);

router.post('/login',
    rateLimiter,
    validateChain([
        body('username', 'Invalid Username')
            .notEmpty().withMessage('Username is required')
            .isString()
            .isLength({ min: 5, max: 20 }),
        body('password', 'Invalid Password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8, max: 20 }),
    ]),
    catchWrap(authController.login)
);

router.post('/refresh-token',
    rateLimiter,
    validateChain([
        body('refreshToken', 'Invalid Refresh Token')
            .notEmpty().withMessage('Refresh Token is required')
            .isString()
    ]),
    catchWrap(authController.refreshToken)
)

export default router;