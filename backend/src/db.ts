import mongoose, { Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, require:true, unique:true},
    userName:{type:String, require:true},
    password:{type:String, require:true}
})

const WebSocketSchema = new mongoose.Schema({
    roomId:{type:String, require:true, unique:true},
    userId: [{type:Schema.Types.ObjectId,default: [], ref:'Users' ,require:true}]
})


const AllAcceptedFriendsSchema  = new mongoose.Schema({
    userId: {type: Types.ObjectId ,ref:'Users', require:true, unique:true},
    allFriend: [{type:Types.ObjectId , default: [], ref:'Users'}]

})
const RequestSendSchema  = new mongoose.Schema({
    userId: {type: Types.ObjectId ,ref:'Users', require:true, unique:true},
    requestSent: [{type:Types.ObjectId , default: [], ref:'Users'}]

})
const RequestRecieveSchem  = new mongoose.Schema({
    userId: {type: Types.ObjectId ,ref:'Users', require:true, unique:true},
    requestRecieve: [{type:Types.ObjectId , default: [], ref:'Users'}]

})



export const userModel = mongoose.model("Users", userSchema)
export const WebSocketIdModel = mongoose.model("Rooms",WebSocketSchema)
export const friendsModel = mongoose.model("AllFriend",AllAcceptedFriendsSchema)
export const RequestSendModel = mongoose.model('RequestSend',RequestSendSchema)
export const RequestRecieveModel = mongoose.model('RequestRecieve',RequestRecieveSchem)