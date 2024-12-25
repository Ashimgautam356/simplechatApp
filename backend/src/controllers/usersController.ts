import {Request,Response, NextFunction } from "express";
import { userModel } from "../db";

export  async function usersController(req:Request,res:Response){
    try{

    // Fetch all users except the one with the userId from the token
    const otherUsers = await userModel.find({ _id: { $ne: req.body._id } }, 'userName _id');

    // Respond with the formatted data
    res.status(200).json({
      otherUsers
    });


    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}