import React from 'react'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'


export const HomePageLayout = () => {
  return (
    <>
        <NavBar></NavBar>

        <Outlet></Outlet>
    </>
  )
}
