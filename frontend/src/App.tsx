import { useAppDispatch, useAppSelector } from "./redux/hooks/index"
import { decrement, increment } from "./redux/slices/counter/counter"
import { useGetPokemonByNameQuery } from "./redux/slices/pokemon-api/pokemon"


export const App = () => {
  const count = useAppSelector((state)=> state.counter)
  const dispatch = useAppDispatch()
  const {data} = useGetPokemonByNameQuery('bulbasaur')
  console.log(data)

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray-600'>
        <div className='p-8 border border-white rounded-lg text-white flex flex-col'>
            <h1 className='p-2'>{count}</h1>
            <button className='p-2 border border-white rounded-md my-4' onClick={()=> dispatch(increment())} >increase</button>
            <button className='p-2 border border-white rounded-md' onClick={()=> dispatch(decrement())}  >decrease</button>
        </div>
    </div>
  )
}
