import { Outlet } from "react-router-dom"
import { NavBar } from "../../components/navBar/navBar"
import { ProfileImg } from "../../components/profileImg/profileImg"
import { ProfileNav } from "../../components/profileNav/profileNav"


export const Profile = () => {

    return (
        <>
            <ProfileImg ></ProfileImg>
            <ProfileNav></ProfileNav>
            <div className="containerProfile" style={{ marginBottom: "3rem" }}>
                <Outlet></Outlet>
            </div>
            <NavBar></NavBar>
        </>
    )

}
