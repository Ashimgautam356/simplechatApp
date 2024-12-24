import { Request,Response } from "express";
import { RequestRecieveModel, RequestSendModel,friendsModel,WebSocketIdModel } from "../db";
import { randomString } from "../utils";

export async function acceptOrDeleteController( req:Request, res:Response){
    const isAccept = req.body.isAccept;
    const senderId = req.body.senderId; 
    const ownerId = req.body._id
    const socketId = await randomString()
    if(isAccept){
        try{
            let friend = await friendsModel.findOne({
                userId:ownerId,
            })
    
            if(!friend){
                await friendsModel.create({
                    userId: ownerId,
                    allFriend:[]
                })
            }
            if(!friend?.allFriend.includes(senderId)){
                friend?.allFriend.push(senderId)
                await friend?.save()

                await WebSocketIdModel.create({
                    userId:[senderId,ownerId],
                    roomId:socketId
                })
            }
    
            if(friend?.allFriend.includes(senderId)){
                // removing the request  from the RequestRecievedb after accepting it 
                let userRequest = await RequestRecieveModel.findOne({
                    userId:ownerId
                })
    
                if(userRequest?.requestRecieve.includes(senderId)){
                    userRequest.requestRecieve.pull(senderId)
                    await userRequest.save()
                }
                // removing the request  from the RequestSenddb after accepting it 
    
                let senderRequest = await RequestSendModel.findOne({
                    userId:senderId
                })
                if(senderRequest?.requestSent.includes(ownerId)){
                    senderRequest.requestSent.pull(ownerId)
                    await senderRequest.save()
                }
    
                res.status(200).json({
                    message:"reqeust accepted"
                })
                return
            }
        }catch(err){
            console.log(err)
            res.status(500).json({
                message:"internal server error"
            })
        }

    }else{
        try{
                // removing the request  from the RequestRecievedb after accepting it 
                let userRequest = await RequestRecieveModel.findOne({
                    userId:ownerId
                })
    
                if(userRequest?.requestRecieve.includes(senderId)){
                    userRequest.requestRecieve.pull(senderId)
                    await userRequest.save()
                }
                // removing the request  from the RequestSenddb after accepting it 
    
                let senderRequest = await RequestSendModel.findOne({
                    userId:senderId
                })
                if(senderRequest?.requestSent.includes(ownerId)){
                    senderRequest.requestSent.pull(ownerId)
                    await senderRequest.save()
                }
    
                res.status(200).json({
                    message:"reqeust deleted"
                })
                return
        }catch(err){
            console.log(err)
            res.status(500).json({
                message:"internal server error"
            })
        }
    }
}