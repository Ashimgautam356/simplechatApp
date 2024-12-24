import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SCRETE } from "..";

export async function auth(req:Request,res:Response,next:NextFunction){
    const token = req.headers.token;
    if(!token){
        res.status(403).json({
            message:"token is missing"
        })
        return
    }
    if(!jwt.verify(String(token),JWT_SCRETE)){
        res.status(403).json({
            message:"fasdftoken is invalid"
        })
        return
    }

    const userId = jwt.decode(String(token)) as { _id: string } | null ;
    if (!userId || !userId._id) {
         res.status(403).json({ message: "Token is invalid" });
         return
    }
    req.body._id = userId._id; 

    next()

}