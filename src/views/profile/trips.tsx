import { Box, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CardTravel } from "../../components/cards/cardTravel"
import { PassengerTrips, TravelCard } from "../../domain/travel"
import { getDriver, getPassenger as tripsFromPassenger } from "../../services/travel.service"


export const Trips = () => {
    const isDriver = localStorage.getItem('isDriver') === 'true'
    const [passengerTrip, setPassengerTrip] = useState<PassengerTrips>({
        pending: [],
        finished: []
    });
    const [driverTrips, setDriverTrips] = useState<TravelCard[]>([]);

    async function fetchData() {
        try {
            if (isDriver) {
                const res = await getDriver()
                setDriverTrips(res);
            } else {
                const res =(await tripsFromPassenger());
                setPassengerTrip(res);
            }
        } catch (error: unknown) {
            // toast.open(error.response.data.message, 'error') ???
            // que paso muchachos??
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {!isDriver ? (
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
            ) : (
            <Box>
                <>
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
            )}
        </>
    )
}