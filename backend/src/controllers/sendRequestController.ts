import { Request,Response } from "express";
import { RequestRecieveModel, RequestSendModel } from "../db";

export async function sendRequestController( req:Request, res:Response){
     const friendUserId  = req.body.request 
        const senderId  = req.body._id
    
    
        try{
            let sender = await RequestSendModel.findOne({
                userId:senderId
            })
            if(!sender){
                sender  = await RequestSendModel.create({
                    userId:senderId,
                    requestSent:[]
                })
            }
            if(!sender.requestSent.includes(friendUserId)){
                sender.requestSent.push(friendUserId)
                await sender.save()
            }
    
            let reciver = await RequestRecieveModel.findOne({
                userId: friendUserId
            })
            if(!reciver){
                reciver  = await RequestRecieveModel.create({
                    userId: friendUserId,
                    requestRecieve:[]
                })
            }
            if(!reciver.requestRecieve.includes(senderId)){
                reciver.requestRecieve.push(senderId)
                await reciver.save()
            }
    
            res.status(200).json({
                message:"request sent"
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                message:"internal server error"
            })
        }
}