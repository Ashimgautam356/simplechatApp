import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "./slices/counter/counter";
import { pokemonApi } from "./slices/pokemon-api/pokemon";


export const store = configureStore({
    reducer:{
        counter: counterSlice,
        [pokemonApi.reducerPath]:pokemonApi.reducer
    },
    middleware: (getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(pokemonApi.middleware)
    }
})



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch