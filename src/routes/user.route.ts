import { Router } from "express";
import userController from "@controllers/user.controller";
import validateChain from "@lib/validateChain";
import { body } from "express-validator";
import catchWrap from "@lib/catchWrap";

const router = Router();

router.get('/user-info', catchWrap(userController.getUserInfo));

router.post('/add-address', 
    validateChain([ 
        body('street', 'Street is required')
            .notEmpty(),
        body('city', 'City is required')
            .notEmpty()
            .isString(),
        body('zip', 'Zipcode is required')
            .notEmpty()
    ]), 
    catchWrap(userController.addAddressToUser)
)

router.post('/add-to-sheets', 
    validateChain([ 
        body('name', 'Name is required')
            .notEmpty(),
        body('email', 'Email is required')
            .notEmpty()
            .isEmail(),
        body('phone', 'Phone is required')
            .notEmpty()
    ]), 
    catchWrap(userController.addToSheets)
)

export default router;
