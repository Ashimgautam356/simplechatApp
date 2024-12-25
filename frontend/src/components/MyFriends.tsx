import { useGetFriendsQuery} from "../store/apis"


export const MyFriends = () => {
    const {data,error,isLoading} = useGetFriendsQuery()
    if(error){
        return <h1>please try again</h1>
    }
    if(isLoading){
        return <h1>loading!!!!!!!!!</h1>
    }


  return (
    <div className='absolute felx flex-col border border-black p-4'>
        {
            data?.friends?.allFriend?.map((user:{_id:string,userName:string})=>{
               return (<div key={user._id} className="p-2 bg-gray-200 mb-2">
                        <p>{user.userName}</p>
                        </div>
                    )
            }) 
        }        

    </div>
  )
}
