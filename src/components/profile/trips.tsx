import { useEffect, useState } from "react"
import { TravelCard } from "../../domain/travel"
import { usetOutletProps } from "../../views/profile"
import { get } from "../../services/travel.service"
import { useToast } from "../../hooks/toast/useToast"
import { CardDriver } from "../card-viajes/cardDriver"

export const Trips = () => {
    const { outletProps } = usetOutletProps()
    const [travels, setTravels] = useState<TravelCard[]>([]);
    const toast = useToast()

    async function fetchData() {
        try {
            const data = await get(outletProps?.id!, outletProps?.role!)
            setTravels(data)
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
                    <p>Completed trips</p>
                </> :
                <>
                    {travels.map((travel: TravelCard, index: number) =>
                        <CardDriver key={index} value={travel} onClick={() => { }} isDriver={outletProps?.role == 'driver'} />
                    )}
                </>

            }
        </>
    )
}