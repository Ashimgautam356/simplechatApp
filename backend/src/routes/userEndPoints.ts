import { Router } from "express";
import { sendRequestController } from "../controllers/sendRequestController";
import { acceptOrDeleteController } from "../controllers/acceptOrDeleteController";
import { myfriend } from "../controllers/myfriend";
import { requestRecieve } from "../controllers/requestRecieve";

export const userEndPoints = Router()


userEndPoints.post('/sendRequest', sendRequestController)
userEndPoints.post('/request/acceptOrDelete', acceptOrDeleteController)
userEndPoints.get('/friends',myfriend)
userEndPoints.get('/requestRecive',requestRecieve)