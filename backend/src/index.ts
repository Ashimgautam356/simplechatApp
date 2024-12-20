import express from "express";
import { userModel } from "./db";
import mongoose from "mongoose";

const app = express()

app.use(express.json())


// signup
app.post('/api/v1/signup',async(req,res)=>{
    try{
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
})

// login
app.post('/api/v1/signin',async(req,res)=>{
    try{
        const email = req.body.email; 
        const password = req.body.password

        const user = await userModel.findOne({
            email:email,
            password:password
        })

        if(!user){
            res.status(403).json({
                message:"crediantials invalid"
            })
            return; 
        }

        res.status(200).json({
            message:"login"
        })
    }
    catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
})

// joinnig the room

app.post('/api/v1/joinRoom',async(req ,res)=>{
    try{

    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
})




async function main (){
    await mongoose.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp")
    app.listen(3000,()=>{
        console.log("server is ready!!!!!!!!")
    })

}

main()