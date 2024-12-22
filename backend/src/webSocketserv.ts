import {WebSocket, WebSocketServer} from 'ws'
import { WebSocketIdModel } from './db'
import { Server } from 'http';


const allSocket = new Map<string,WebSocket[]>()


export function setupWebSocketServer(server:Server) {
    const wss = new WebSocketServer({port:3001});


    wss.on("connection",(socket)=>{
    socket.on("message", async(evnt)=>{

        const parsedMessage = JSON.parse(evnt as unknown as string)
        let rmId = await  WebSocketIdModel.findOne({
            roomId:parsedMessage.payload.roomId
        })


        const senderId = parsedMessage.payload.senderId
        const recieverId = parsedMessage.payload.recieverId

        if(!rmId){
            console.log("rmId is null")
            return;
        }
        if(parsedMessage.payload.roomId == rmId.roomId && senderId== rmId.userId.includes(senderId) && recieverId == rmId.userId.includes(recieverId)  ){
            
            const roomId = parsedMessage.payload.roomId
            if(parsedMessage.type=='join'){
                if(!allSocket.has(roomId)){
                    allSocket.set(roomId,[])
                }
                allSocket.get(roomId)?.push(socket)
                console.log("user Connected")
            }

            if(parsedMessage.type=='chat'){
                const message = parsedMessage.payload.message;

                allSocket.get(roomId)?.forEach((clientSocket)=>{
                    if(clientSocket.readyState == WebSocket.OPEN){
                        clientSocket.send(message)
                    }
                })
            }

        }
    })
    })

    console.log("WebSocket server is set up");
    return wss;
}