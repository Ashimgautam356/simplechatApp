import { Response,Request } from "express";
import { friendsModel } from "../db";


export async function myfriend(req:Request, res:Response){
    try{

        const userId = req.body._id; 
        const friends = await friendsModel.findOne({userId:userId})

        res.status(200).json({
            message:"success",
            friends:friends
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}