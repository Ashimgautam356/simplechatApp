import { Request,Response } from "express";
import { RequestRecieveModel } from "../db";


export async function requestRecieve(req:Request,res:Response){

    try{
        const userId = req.body._id; 
        const requestUser = await RequestRecieveModel.findOne({
            userId
        }).populate('requestRecieve','userName _id')

        res.status(200).json({
            message:"sucess",
            users:requestUser
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}