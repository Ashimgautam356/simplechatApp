import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApp = createApi({
    reducerPath:"chatApp",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/v1/',
        // prepareHeaders:(headres)=>{
        //     headres.set('token','')
        // }
    }),
    
    endpoints: (builder)=>({
        getUsers: builder.query({
            query:(userId)=>(userId? `users/${userId}`: 'users'),
        }),
        loginUser: builder.mutation({
            query:({email,password})=>({
                url:'signin',
                method:'POST',
                body:{
                    email,
                    password
                }
            })

        }),
        signupUser: builder.mutation({
            query:({userName,email,password})=>({
                url:'signup',
                method:'POST',
                body:{
                    email,
                    password,
                    userName
                }
            })
        })
    })


})

export const {useGetUsersQuery,useLoginUserMutation,useSignupUserMutation} = chatApp