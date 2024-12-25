import { useAppDispatch, useAppSelector } from "../store/hooks"
import {changeState} from "../store/slices/showfriend/showFriend"
import { MyFriends } from "./MyFriends"



export const NavBar = () => {

    const dispatch = useAppDispatch()
    const state =useAppSelector((state)=> state.showFriend)
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

    </div>
  )
}
