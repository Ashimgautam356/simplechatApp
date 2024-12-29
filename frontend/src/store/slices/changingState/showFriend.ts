import { createSlice } from "@reduxjs/toolkit";


export const showFriendsSlice = createSlice({
    initialState:false,
    name:'showFriends',
    reducers:{
        changeState:(state)=> !state
    }
})

export const {changeState} = showFriendsSlice.actions
export default showFriendsSlice.reducer