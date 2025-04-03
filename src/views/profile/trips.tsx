import { Box, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { PassengerTrips, TravelCard } from "../../domain/travel"
import { getPassenger as tripsFromPassenger} from "../../services/travel.service"
import { getDriver } from "../../services/travel.service"
import { CardTravel } from "../../components/cards/cardTravel"


export const Trips = () => {
    const idUser = parseInt(sessionStorage.getItem('userId')!)
    const isDriver = sessionStorage.getItem('isDriver') === 'true'
    const [passengerTrip, setPassengerTrip] = useState<PassengerTrips>({
        pending: [],
        finished: []
    });
    const [driverTrips, setDriverTrips] = useState<TravelCard[]>([]);

    async function fetchData() {
        try {
            const rol = isDriver ? 'driver' : 'passenger';
            if (isDriver) {
                const res = await getDriver(idUser, rol)
                setDriverTrips(res);
            } else {
                setPassengerTrip(await tripsFromPassenger(idUser, rol));
            }
        } catch (error: any) {
            // toast.open(error.response.data.message, 'error')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {!isDriver ?
                <>
                    <Box>
                        {passengerTrip.pending.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h6" color="secondary" sx={{ textAlign: 'center', width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>
                                    Pending trips
                                </Typography>
                                {passengerTrip.pending.map((travel: TravelCard, index: number) => (
                                    <CardTravel key={index} value={travel} />
                                ))}
                            </Box>
                        )}

                        <Divider sx={{ borderColor: '#a737fc', width: '100%' }} />

                        {passengerTrip.finished.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                                <Typography variant="h6" color="secondary" sx={{ textAlign: 'center', width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>Completed trips</Typography>
                                {passengerTrip.finished.map((travel: TravelCard, index: number) => (
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