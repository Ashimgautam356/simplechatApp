import {Request,Response, NextFunction } from "express";
import { friendsModel, RequestRecieveModel, RequestSendModel, userModel } from "../db";

export  async function usersController(req:Request,res:Response){
    try{
        const userId = req.body._id

        const requestSent = await RequestSendModel.findOne({ userId });
        const sentUserIds = requestSent?.requestSent || [];
    
        const requestRecieve = await RequestRecieveModel.findOne({ userId });
        const receivedUserIds = requestRecieve?.requestRecieve || [];

        const actualFriends = await friendsModel.findOne({userId}); 
        const friendsId = actualFriends?.allFriend || []
        
        const excludedUserIds = [...sentUserIds, ...receivedUserIds,...friendsId, userId];


    // Fetch all users except the one with the userId from the token
    const otherUsers = await userModel.find(
        { _id: { $nin: excludedUserIds } }, 
        'userName _id' // Fetch only userName and _id fields
      );

    // Respond with the formatted data
    res.status(200).json({
        otherUsers,
      });


    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}