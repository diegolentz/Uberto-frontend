import axios, { AxiosError } from "axios"
import { useContext, useState } from "react"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { FormTravel } from "../components/formTravel.tsx/formTravel"
import { CardDriver } from "../components/card-viajes/cardDriver"



export const Home = () => {
    const { showToast } = useContext(msjContext)
    const [isDriver, setIsDriver] = useState<Boolean>(false)
    


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
            <HomeForm  type={isDriver}></HomeForm>
            <CardDriver></CardDriver>
            <CardDriver></CardDriver>
            <CardDriver></CardDriver>

        </>

    )
}