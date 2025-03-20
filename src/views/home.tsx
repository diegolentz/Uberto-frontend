import axios, { AxiosError } from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { CardDriver } from "../components/card-viajes/cardDriver"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { Driver, driverMock } from "../domain/driver"
import { Travel, travelMock } from "../domain/travel"
import { ConfirmationPage } from "../components/confirmationPage/confirmationPage"
import { set } from "react-hook-form"
import { Box } from "@mui/material"

export const Home = () => {
    const [isDriver, setIsDriver] = useState<boolean>(sessionStorage.getItem("idDriver") === "true")

    const { showToast } = useContext(msjContext)

    const [data, setData] = useState<Driver | Travel | null>(null)

    const tipo = data instanceof Driver ? "true" : data instanceof Travel ? "false" : "Unknown"

    
    const [isHome, setIsHome] = useState<boolean>(true)
    const [travel, setTravel] = useState<Travel>(travelMock)
    const [driver, setDriver] = useState<Driver>(driverMock)

    const asignTravel = (travel: Travel) => {
        setTravel(travel)
    }

    const changePage = () => {
        setIsHome(!isHome)
    }

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

    useEffect(() => {

    }, [])

    return (
        <>
                {isHome ? (
                    <>
                        <HomeForm type={isDriver} travel={asignTravel} /> {/* faltaría el id de quien se registra */}

                        <CardDriver type={false} value={driverMock} onClik={changePage} />
                        <CardDriver type={true} value={travelMock} onClik={changePage} />
                        <CardDriver type={false} value={driverMock} onClik={changePage} />
                        <CardDriver type={true} value={travelMock} onClik={changePage} />
                        <CardDriver type={false} value={driverMock} onClik={changePage} />
                        <CardDriver type={true} value={travelMock} onClik={changePage} />
                    </>
                ) : (
                    <ConfirmationPage driver={driver} travel={travel} />
                )}
        </>
    )

}