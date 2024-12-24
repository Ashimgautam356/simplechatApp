import { Router } from "express";
import { sendRequestController } from "../controllers/sendRequestController";
import { acceptOrDeleteController } from "../controllers/acceptOrDeleteController";

export const userEndPoints = Router()


userEndPoints.post('/sendRequest', sendRequestController)
userEndPoints.post('/request/acceptOrDelete', acceptOrDeleteController)