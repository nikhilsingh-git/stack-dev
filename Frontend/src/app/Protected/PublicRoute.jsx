import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    //  let {student,isLoading}=useSelector((store)=>store.auth)
    //  if(isLoading){
    //     return <h1>...Loading</h1>
    // }
    // if(student){
    //     return <Navigate to="/home"/>
    // }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default PublicRoute
