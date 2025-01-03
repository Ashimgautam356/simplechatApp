import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const chatApp = createApi({
    reducerPath:"chatApp",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/v1/',
        prepareHeaders: (headers) => {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
      
            if (token) {
              headers.set('token', `${token}`);
            }
      
            return headers; // Always return the headers
          },
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
        }),
        sendRequest: builder.mutation({
            query:({request})=>({
                url:'user/sendRequest',
                method:"POST",
                body:{
                    request
                }
            })
        }),
        getFriends:builder.query({
            query:(userId)=>(userId? `user/friends/${userId}`: 'user/friends' )
        }),
        getRequestRecive:builder.query({
            query:(userId)=>(userId?`user/requestRecive/${userId}`:'user/requestRecive')
        }),
        acceptOrdelte:builder.mutation({
            query:({isAccept,senderId})=>({
                url:'user/request/acceptOrDelete',
                method:"POST",
                body:{
                    isAccept,
                    senderId
                }
            })
        })


    })


})

export const {useGetUsersQuery,useLoginUserMutation,useSignupUserMutation,useSendRequestMutation, useGetFriendsQuery,useGetRequestReciveQuery,useAcceptOrdelteMutation} = chatApp