import axios, { AxiosError } from "axios"
import { useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"


export const Profile = () => {
    const navigate = useNavigate()
    
    function navigateTo(path:string){
        navigate(path)
    }
    return (
        <>
            <div>Foto y nombre</div>
            <div style={{display:'flex'}}>
                <button onClick={()=>{navigate("/profile/data")}}>DATA</button>
                <button onClick={()=>{navigate("/profile/trips")}}>TRIPS</button>
                <button onClick={()=>{navigate("/profile/ratings")}}>RATINGS</button>
            </div>
            <Outlet></Outlet>
        </>
    )
    
}