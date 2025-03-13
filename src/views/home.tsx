import axios, { AxiosError } from "axios"
import { useContext, useState } from "react"
import { CardDriver } from "../components/card-viajes/cardDriver"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { Driver, driverMock, Travel, travelMock } from "../domain/driver"



export const Home = () => {
    const { showToast } = useContext(msjContext)
    const [isDriver, setIsDriver] = useState<Boolean>(false)
    const [data,setData]= useState<Driver | Travel | null>(null)
    
    // eliminar cuando se armen los endpoints
    const driver = driverMock
    const travel = travelMock


    const cod200 = async () => {
        try {
            const res = await axios.get('https://checkip.amazonaws.com')
            console.log('res => ', res)
            showToast(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const cod400 = async () => {
        try {
            const res = await axios.get('https://www.google.com')
            console.log('res => ', res)
            showToast(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }
   
    return (
        <>
            <HomeForm  type={isDriver}></HomeForm>{/* faltaria el id de quiern se registra */}
            <CardDriver type={isDriver} value={driver}></CardDriver>
            <CardDriver type={true} value={travel}></CardDriver>
            <CardDriver type={isDriver} value={driver}></CardDriver>
            <CardDriver type={true} value={travel}></CardDriver>
            <CardDriver type={isDriver} value={driver}></CardDriver>
            <CardDriver type={true} value={travel}></CardDriver>
            

        </>

    )
}