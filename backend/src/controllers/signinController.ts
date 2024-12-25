import { Request,Response } from "express";
import { userModel } from "../db";
import jwt from 'jsonwebtoken'
import { JWT_SCRETE } from "..";

export async function signinController( req:Request, res:Response){
        try{
            const email = req.body.email; 
            const password = req.body.password
    
            const user = await userModel.findOne({
                email:email,
                password:password
            },'userName _id')
    
            if(!user){
                res.status(403).json({
                    message:"crediantials invalid"
                })
                return; 
            }
    
            const token = jwt.sign({
                _id:user._id
            },JWT_SCRETE)
    
            res.status(200).json({
                message:"login",
                token: token,
                user: user
            })
        }
        catch(err){
            res.status(500).json({
                message:"internal server error"
            })
        }
}