import { useAcceptOrdelteMutation, useGetRequestReciveQuery} from "../store/apis"


export const RequestRecive = () => {

         const {data,error,isLoading} = useGetRequestReciveQuery()
         console.log(data)
          const [request] = useAcceptOrdelteMutation()
        
            if(error){
                return (<h1>please try again</h1>)
            }
            if(isLoading){
                return (<h1>loading!!!!!!!!!</h1>)
            }
            
    
            const sendRequest = async(id:string,isAccept:boolean)=>{
               
                const result =  await request({request:id,isAccept}).unwrap()
                console.log(result)
                if(result.message=='sucess'){
                    alert(`sadfa`)
                    return;
                }
    
            }


  return (
    <div className='mt-8'>  

    <div className=" w-96 border border-black p-8" >
        {
        data?.users?.requestRecieve?.map((user:{_id:string,userName:string})=>{
           return (<div key={user._id} className="p-2 bg-gray-200 mb-2 flex justify-around">
                    <p>{user.userName}</p>
                    <button className="p-2 border border-black rounded-lg" onClick={()=>sendRequest(user._id,true)}>Accept</button>
                    <button className="p-2 border border-black rounded-lg" onClick={()=>sendRequest(user._id,false)}>Delete</button>
                    </div>
                )
        }) 
        }

    </div>
        
</div>
  )
}
