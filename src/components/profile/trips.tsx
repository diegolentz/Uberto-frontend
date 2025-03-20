import axios, { AxiosError } from "axios"
import { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import { CardDriver } from "../card-viajes/cardDriver"
import { Travel, travelMock } from "../../domain/travel"


export const Trips = () => {
    const func = () => {
        console.log('Click')
    }
   
    return (
        <>
            <CardDriver type={true} value={travelMock} onClik={func}></CardDriver>
        </>
    )
    
}