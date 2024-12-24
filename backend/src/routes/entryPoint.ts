import { Router } from "express";
import { signupController } from "../controllers/signupController";
import { signinController } from "../controllers/signinController";
import { usersController } from "../controllers/usersController";

export const entryPoint = Router()

entryPoint.post('/signup',signupController)
entryPoint.post('/signin', signinController)
entryPoint.get('/users', usersController)