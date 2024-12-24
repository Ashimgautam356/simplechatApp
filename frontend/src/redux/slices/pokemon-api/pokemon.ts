
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
    reducerPath:'pokemonApiss',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://pokeapi.co/api/v2/'
    }),
    endpoints:(builder)=>({
        getPokemonByName: builder.query({
            query:()=> `pokemon`,

        }),
    }),
})

export const {useGetPokemonByNameQuery}= pokemonApi