import { useEffect, useState } from "react"
import { TravelCard } from "../../domain/travel"
import { usetOutletProps } from "../../views/profile"
import { getPassengerPending, getPassengerFinished, getDriver } from "../../services/travel.service"
import { useToast } from "../../hooks/toast/useToast"
import { CardDriver } from "../card-viajes/cardDriver"
import { DriverCard } from "../../domain/driver"

export const Trips = () => {
    const { outletProps } = usetOutletProps()
    const toast = useToast()
    // ////////////////////////////////////////////////////////////////////////////////////////
    // Esto no deberian ser 3 listas diferentes. 1 sola lista de viajes y que lo resuelva la card
    // Hay que limpiar <CardDriver></CardDriver>
    // Tengo 3 useState, 3 llamados de service
    const [passengerFinishedTrips, setpassengerFinishedTrips] = useState<TravelCard[]>([]);
    const [passengerPendingTrips, setPassengerPendingTrips] = useState<TravelCard[]>([]);
    const [driverTrips, setDriverTrips] = useState<DriverCard[]>([]);
    // //////////////////////////////////////////////////////////////////////////////////////
    
    async function fetchData() {
        try {
            if(outletProps?.role! == 'driver'){
                const data = await getDriver(outletProps?.id!, outletProps?.role!)
                setDriverTrips(data)
            }else{
                const pendings = await getPassengerPending(outletProps?.id!, outletProps?.role!)
                const finished = await getPassengerFinished(outletProps?.id!, outletProps?.role!)
                setPassengerPendingTrips(pendings)
                setpassengerFinishedTrips(finished)
            }
        }
        catch (error: any) {
            toast.open(error.response.data.message, 'error')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {outletProps?.role == 'passenger' ?
                <>
                    <p>Pending trips</p>
                    {passengerPendingTrips.map((travel: TravelCard, index: number) =>
                        <CardDriver key={index} value={travel} onClick={() => { }} isDriver={outletProps?.role == 'passenger'} />
                    )}
                    <p>Completed trips</p>
                    {passengerFinishedTrips.map((travel: TravelCard, index: number) =>
                        <CardDriver key={index} value={travel} onClick={() => { }} isDriver={outletProps?.role == 'passenger'} />
                    )}
                </>
                :
                <>
                    {driverTrips.map((travel: DriverCard, index: number) =>
                        <CardDriver key={index} value={travel} onClick={() => { }} isDriver={outletProps?.role == 'driver'} />
                    )}
                </>

            }
        </>
    )
}