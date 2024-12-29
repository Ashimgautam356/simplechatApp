import { createSlice } from "@reduxjs/toolkit";

export const openChatBoxSlices  = createSlice({
    name:'openChatBox',
    initialState:false,
    reducers:{
        changeState: (state)=> !state
    }
})

export const {changeState} = openChatBoxSlices.actions
export default openChatBoxSlices.reducer