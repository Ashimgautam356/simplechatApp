import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, require:true, unique:true},
    userName:{type:String, require:true},
    password:{type:String, require:true}
})

const userRooms = new mongoose.Schema({
    userId: {type:[Schema.Types.ObjectId], ref:'Users', require:true, unique:true},
    roomId:{type:String, require:true, unique:true} 
})

const friendsSchema = new mongoose.Schema({
    userId: {type:[Schema.Types.ObjectId], ref:'Users', require:true, unique:true},
    friends: {type:[Schema.Types.ObjectId], ref:'Users', unique:true},
    requestSent: {type:[Schema.Types.ObjectId], ref:'Users', unique:true},
    requestRecieve: {type:[Schema.Types.ObjectId], ref:'Users', unique:true},
})

export const userModel = mongoose.model("Users", userSchema)
export const userRoomModel = mongoose.model("Rooms",userRooms)
export const friendsModel = mongoose.model("Friends",friendsSchema)