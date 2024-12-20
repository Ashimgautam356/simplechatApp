import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email:String,
    userName:String,
    password:String
})

const userRooms = new mongoose.Schema({
    roomId:String,
    userId:[Schema.Types.ObjectId]
})

export const userModel = mongoose.model("Users", userSchema)
export const userRoomModel = mongoose.model("Rooms",userRooms)