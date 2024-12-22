import express, {Request,Response, NextFunction } from "express";
import { friendsModel, RequestSendModel, RequestRecieveModel, userModel, WebSocketIdModel } from "./db";
import mongoose, { ObjectId,Types,isValidObjectId } from "mongoose";
import z  from 'zod'
import jwt from 'jsonwebtoken'
import { randomString } from "./utils";
import WebSocketServer from 'ws'
import { setupWebSocketServer } from "./webSocketserv";



const JWT_SCRETE = 'this is the super secrete key'
const app = express()

app.use(express.json())


// signup
app.post('/api/v1/signup',async(req,res)=>{
    // const userSignupSchema = z.object({
    //     userName:z.string().min(3,{message:"minimum length shoudl be 3"}).max(15,{message:"maximum length shoudl be 15"}),
    //     email:z.string().email({message:"should be in a email format"}),
    //     password:z.string()
    // })
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

        const token = jwt.sign({
            _id:user._id
        },JWT_SCRETE)

        res.status(200).json({
            message:"login",
            token: token
        })
    }
    catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
})


// middle ware
async function auth(req:Request,res:Response,next:NextFunction){
    const token = req.headers.token;
    if(!token){
        res.status(403).json({
            message:"token is missing"
        })
        return
    }
    if(!jwt.verify(String(token),JWT_SCRETE)){
        res.status(403).json({
            message:"token is invalid"
        })
        return
    }

    const userId = jwt.decode(String(token)) as { _id: string } | null ;
    if (!userId || !userId._id) {
         res.status(403).json({ message: "Token is invalid" });
         return
    }
    req.body._id = userId._id; 

    next()

}
app.get('/api/v1/users',async(req,res)=>{
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
})

app.use(auth)

// sending request 
app.post("/api/v1/user/sendRequest", async(req,res)=>{
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
})


// accepting the request

app.post("/api/v1/user/request/acceptOrDelete", async (req,res)=>{
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
    
})

import http from 'http'

const server = http.createServer(app);

setupWebSocketServer(server)



async function main (){
    await mongoose.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp")
    app.listen(3000,()=>{
        console.log("server is ready!!!!!!!!")
    })

}

main()