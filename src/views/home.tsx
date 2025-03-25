import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { CardDriver } from "../components/card-viajes/cardDriver"
import { CardTravel } from "../components/card-viajes/cardTravel"
import { ConfirmationPage } from "../components/confirmationPage/confirmationPage"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { DriverCard, FormDriver, FormEntity } from "../domain/driver"
import { FormPassenger } from "../domain/passenger"
import { TravelCard } from "../domain/travel"
import { driverService } from "../services/driver.service"
import { passengerService } from "../services/passenger.service"
export const Home = () => {
    const idUser = parseInt(sessionStorage.getItem("userId")!)
    const isDriver = sessionStorage.getItem("role") === "driver" ? true : false

    const [card, setCard] = useState<DriverCard[] | TravelCard[] | null>(null)
    const [isHome, setIsHome] = useState<boolean>(true)
    const [formInfo, setFormInfo] = useState<FormDriver | FormPassenger>()
    const { showToast } = useContext(msjContext)
    const [driveSelected, setDriveSelected] = useState<DriverCard | TravelCard>()

    const infoForm = (formValues: FormDriver | FormPassenger) => {
        setFormInfo(formValues)
    }

    const fetchData = async (formInfo: FormDriver | FormPassenger) => {
        const data = new FormEntity(formInfo)
        data.userId = idUser
        if (isDriver) {
            try {
                const res = await driverService.getPendingTravels(data);// segui
                setCard(res)
            } catch (e: unknown) {
                showToast((e as AxiosError<unknown>).response!)
            }
        } else {
            try {
                const res = await passengerService.getAvailableDrivers(data);
                setCard(res.cardDrivers as TravelCard[])
                formInfo.duration = res.time
                infoForm(formInfo)
            } catch (e: unknown) {
                showToast((e as AxiosError<unknown>).response!)
            }
        }
    };

    // atrapo los datos del chofer clickeado y cambio de pantalla
    const changePage = (data: DriverCard | TravelCard) => {
        setDriveSelected(data)
        setIsHome(!isHome)
        setCard([])
    }

    useEffect(() => {
        if (formInfo) {
            fetchData(formInfo);
        }
        console.log(isDriver)
    }, [formInfo]);


    return (
        <>
            {isHome ? (
                <>
                    <HomeForm fetchData={fetchData} />

                    {isDriver ? (
                        card?.map((item, index) => (
                            <CardTravel
                                key={index}
                                value={item as TravelCard}
                            />

                        ))
                    ) : (
                        card?.map((item, index) => (
                            <CardDriver
                                key={index}
                                value={item as DriverCard}
                                onClick={() => changePage(item)}
                            />
                        ))
                    )}
                </>
            ) : (
                <ConfirmationPage
                    driver={driveSelected as DriverCard}
                    travel={formInfo as FormDriver}
                    changePage={changePage}
                />
            )}
        </>
    )
}




