import { useGetUsersQuery, useSendRequestMutation } from "../store/apis"
import { MessageBox } from "./MessageBox"

export const Users = () => {


      const {data,error,isLoading} = useGetUsersQuery()
      const [request] = useSendRequestMutation()
    
        if(error){
            return (<h1>please try again</h1>)
        }
        if(isLoading){
            return (<h1>loading!!!!!!!!!</h1>)
        }
        

        const sendRequest = async(id:string)=>{
           
            const result =  await request({request:id}).unwrap()
            if(result.message=='request sent'){
                alert("reqest is sent")
                return;
            }

        }

  return (
    <div className='mt-8'>  

        <div className=" w-96 border border-black p-8" >
            {
            data?.otherUsers?.map((user:{_id:string,userName:string})=>{
               return (<div key={user._id} className="p-2 bg-gray-200 mb-2 flex justify-around">
                        <p>{user.userName}</p>
                        <button className="p-2 border border-black rounded-lg" onClick={()=>sendRequest(user._id)}>send Request</button>
                        </div>
                    )
            }) 
            }

        </div>

        <div>
            <MessageBox></MessageBox>
        </div>
            
    </div>
  )
}
