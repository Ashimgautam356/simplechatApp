import React from 'react'
import { useAppSelector } from '../store/hooks'

export const MessageBox = () => {
    const state = useAppSelector((state)=> state.openChatBox)

  return (
    <>
        <div>
            this is chat box
        </div>
    
    </>
  )
}
