import { Router } from "express";
import userController from "@controllers/user.controller";
import validateChain from "@lib/validateChain";
import { body } from "express-validator";
import catchWrap from "@lib/catchWrap";


const router = Router();



export default router;
