import { Outlet, useOutletContext } from "react-router-dom"
import { ProfileNav } from "../components/profileNav/profileNav"
import { NavBar } from "../components/navBar/navBar"
import { ProfileImg } from "../components/profileImg/profileImg"
import { useState } from "react"

export type Role = 'driver' | 'passenger'

export type OutletProps = {
    id:number;
    role:Role;
}

type OutletContextType = { outletProps: OutletProps | null };

export function usetOutletProps() {
    return useOutletContext<OutletContextType>();
}

export const Profile = () => {

    const [outletProps] = useState<OutletProps>({
        id: parseInt(sessionStorage.getItem('userId')!),
        role: sessionStorage.getItem('role') as Role
    })
    return (
        <>
            <ProfileImg ></ProfileImg>
            <ProfileNav></ProfileNav>
            <Outlet context={{outletProps} satisfies OutletContextType}></Outlet>
            <NavBar></NavBar>
        </>
    )
    
}
