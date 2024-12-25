import { configureStore } from "@reduxjs/toolkit";
import { chatApp } from "./apis";
import  showFriendsSlice  from "./slices/showfriend/showFriend";
import  currentUserReducer  from "./slices/currentUser/currentUser";
import  showRequestSlice  from "./slices/showfriend/showRequest";

export const store = configureStore({
    reducer:{
        [chatApp.reducerPath]:chatApp.reducer,
        showFriend:showFriendsSlice,
        currentUser: currentUserReducer,
        showRequest: showRequestSlice,
    },

    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(chatApp.middleware)
    }
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch