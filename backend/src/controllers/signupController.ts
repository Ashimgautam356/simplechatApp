import { Request,Response } from "express";
import { userModel } from "../db";
export async function signupController( req:Request, res:Response){
    try{
        const isUserExist = await userModel.findOne({
            email:req.body.email
        })

        if(isUserExist){
            res.status(411).json({
                message:"user already exists"
            })
            return 
        }

        await userModel.create({
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password
        })

        res.status(200).json({
            message:"account has been created"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}