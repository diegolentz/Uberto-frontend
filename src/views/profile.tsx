import { Outlet } from "react-router-dom"
import { ProfileNav } from "../components/profileNav/profileNav"
import { NavBar } from "../components/navBar/navBar"
import { ProfileImg } from "../components/profileImg/profileImg"


export const Profile = () => {
    
    return (
        <>
            <ProfileImg ></ProfileImg>
            <ProfileNav></ProfileNav>
            <Outlet></Outlet>
            <NavBar></NavBar>
        </>
    )
    
}