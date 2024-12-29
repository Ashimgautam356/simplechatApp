import { createSlice } from "@reduxjs/toolkit";


export const showRequestSlice = createSlice({
    initialState:false,
    name:'showrequest',
    reducers:{
        changeRequesState:(state)=> !state
    }
    
})

export const {changeRequesState} = showRequestSlice.actions

export default showRequestSlice.reducer