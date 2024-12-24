import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApp = createApi({
    reducerPath:"chatApp",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/v1/',
    }),
    endpoints: (builder)=>({
        getUsers: builder.query({
            query:()=>'getUsers',
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

        })
    })


})

export const {useGetUsersQuery,useLoginUserMutation} = chatApp