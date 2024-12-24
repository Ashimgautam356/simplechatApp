import {Request,Response, NextFunction } from "express";
import { userModel } from "../db";


export  async function usersController(req:Request,res:Response,nex:NextFunction){
    try{
        const user = await userModel.find({},'userName _id')
        res.status(200).json({
            users:user
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}