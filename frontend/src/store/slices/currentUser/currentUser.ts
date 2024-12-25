import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    userName: null,
}

export const currentUserSlice = createSlice({
    initialState,
    name:"currentUser",
    reducers:{
        setCurrentUser:(state,action)=>{
            const {userId,userName} = action.payload
            state.userId = userId; 
            state.userName = userName;
        },
        clearCurrentUser: (state) => {
            state.userId = null;
            state.userName = null;
          },
    }
})

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer