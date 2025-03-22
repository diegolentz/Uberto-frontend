import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { CardDriver } from "../card-viajes/cardDriver"
import { pastTravel, TravelCard, } from "../../domain/travel"
import { driverCard } from "../../domain/driver"
import { driverService } from "../../services/driver.service"
import { Divider } from "@mui/material"

// si soy chofer voy a ver todos los viajes que realice y el total recaudado
// falta implementar el total recaudado
// si soy pasajero voy a ver los viajes que tengo pendientes y los que ya realice

export const Trips = () => {
    const id = parseInt(sessionStorage.getItem('idUser')!);
    const isDriver = sessionStorage.getItem('isDriver') === 'true';
    const [travels, setTravels] = useState<TravelCard[]>([]);
    const [finishTrips, setFinishTrips] = useState<TravelCard[]>([]);
    const func = () => {
        console.log('Click')
    }
    const tripsDriver = async () => {
        const res = await driverService.getProfilePendingTravels(id);
        setTravels(res);
    }

    const tripsPassenger = async () => {
        const res = await driverService.getProfilePendingTravels(id);
        const finish = await driverService.getFinishtrips(id);   
        setTravels(res);
        setFinishTrips(finish);


    }
    useEffect(() => {
        if (isDriver) {
            tripsDriver()
        } else {
            tripsPassenger()
        }
    }, [])

    return (
        <>
            <p>Viajes Realizados</p>
            {travels.map((travel, index) => (
                <CardDriver key={index} value={travel} onClick={func} isDriver={true}/>
            ))}
            <p>Viajes Pendientes</p>
             <Divider sx={{ borderColor: '#a737fc', width: '100%' }} />
            {finishTrips.map((travel, index) => (
                <CardDriver key={index} value={travel} onClick={func} isDriver={true}/>
            ))}
        </>
    )

}