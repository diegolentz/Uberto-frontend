import { useEffect, useState } from "react"
import { TravelCard } from "../../domain/travel"
import { usetOutletProps } from "../../views/profile"
import { getPassengerPending, getPassengerFinished, getDriver } from "../../services/travel.service"
import { useToast } from "../../hooks/toast/useToast"
import { CardDriver } from "../card-viajes/cardDriver"
import { DriverCard } from "../../domain/driver"
import { CardTravel } from "../card-viajes/cardTravel"
import { Box, Divider, Typography } from "@mui/material"

export const Trips = () => {
    const { outletProps } = usetOutletProps()
    const toast = useToast()
    // ////////////////////////////////////////////////////////////////////////////////////////
    // Esto no deberian ser 3 listas diferentes. 1 sola lista de viajes y que lo resuelva la card
    // Hay que limpiar <CardDriver></CardDriver>
    // Tengo 3 useState, 3 llamados de service
    const [passengerFinishedTrips, setpassengerFinishedTrips] = useState<TravelCard[]>([]);
    const [passengerPendingTrips, setPassengerPendingTrips] = useState<TravelCard[]>([]);
    const [driverTrips, setDriverTrips] = useState<TravelCard[]>([]);
    // //////////////////////////////////////////////////////////////////////////////////////

    async function fetchData() {
        try {
            if (outletProps?.role! == 'driver') {
                const data = await getDriver(outletProps?.id!, outletProps?.role!)
                setDriverTrips(data)
            } else {
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
                    <Box>
                        {passengerPendingTrips.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h6" color="secondary" sx={{ textAlign: 'center', width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>
                                    Pending trips
                                </Typography>
                                {passengerPendingTrips.map((travel: TravelCard, index: number) => (
                                    <CardTravel key={index} value={travel} />
                                ))}
                            </Box>
                        )}

                        <Divider sx={{ borderColor: '#a737fc', width: '100%' }} />

                        {passengerFinishedTrips.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" color="secondary" sx={{ textAlign: 'center', width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>Completed trips</Typography>
                                {passengerFinishedTrips.map((travel: TravelCard, index: number) => (
                                    <CardTravel key={index} value={travel} />
                                ))}
                            </Box>
                        )}
                    </Box>
                </>
                :
                <Box>
                    <>
                    <Divider sx={{ borderColor: '#a737fc', width: '100%' }} />
                        {driverTrips.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" color="secondary" sx={{ textAlign: 'center', width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>Completed trips</Typography>
                                {driverTrips.map((travel: TravelCard, index: number) => (
                                    <CardTravel key={index} value={travel} />
                                ))}
                            </Box>
                        )}
                    </>
                </Box>
            }
        </>
    )
}