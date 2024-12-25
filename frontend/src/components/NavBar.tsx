import { useAppDispatch, useAppSelector } from "../store/hooks"
import {changeState} from "../store/slices/showfriend/showFriend"
import { changeRequesState } from "../store/slices/showfriend/showRequest"
import { MyFriends } from "./MyFriends"
import { RequestRecive } from "./RequestRecive"



export const NavBar = () => {

    const dispatch = useAppDispatch()
    const state =useAppSelector((state)=> state.showFriend)
    const requestState =useAppSelector((state)=> state.showRequest)
    const userName = useAppSelector((state)=> state.currentUser)

  return (
    <div className='min-h-14 w-screen flex justify-around items-center'>
        <div>
            <p>{userName.userName}</p>
        </div>
        <div>
            <p onClick={()=>{dispatch(changeState())}} className="cursor-pointer">Friends</p>
            { state && <MyFriends></MyFriends>}
        </div>
        <div>
            <p onClick={()=>{dispatch(changeRequesState())}} className="cursor-pointer" >requestRecive</p>
            {requestState && <RequestRecive></RequestRecive>}
        </div>

    </div>
  )
}
