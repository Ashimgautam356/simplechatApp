import express from "express";
import mongoose from "mongoose";

import { setupWebSocketServer } from "./webSocketserv";
import cors from 'cors'
import http from 'http'
import { entryPoint } from "./routes/entryPoint";
import { auth } from "./middleware/auth";
import { userEndPoints } from "./routes/userEndPoints";
export const JWT_SCRETE = 'this is the super secrete key'





const app = express()

app.use(express.json())
app.use(cors())
const currentVersion = '${/api/v1}'


app.post(`${currentVersion}`,entryPoint)

// middle ware


app.use(auth)



// sending request 
app.post(`${currentVersion}/user`,userEndPoints)




const server = http.createServer(app);

setupWebSocketServer(server)



async function main (){
    await mongoose.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp")
    app.listen(3000,()=>{
        console.log("server is ready!!!!!!!!")
    })

}

main()