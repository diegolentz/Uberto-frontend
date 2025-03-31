import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { CardDriver } from "../components/cards/cardDriver"
import { CardTravel } from "../components/cards/cardTravel"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { DriverCard, FormDriver, FormEntity } from "../domain/driver"
import { FormPassenger } from "../domain/passenger"
import { TravelCard } from "../domain/travel"
import { driverService } from "../services/driver.service"
import { passengerService } from "../services/passenger.service"
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const idUser = parseInt(sessionStorage.getItem("userId")!)
    const isDriver = sessionStorage.getItem("isDriver") === "true"
    const [card, setCard] = useState<DriverCard[] | TravelCard[] | null>(null)
    const [formInfo, setFormInfo] = useState<FormDriver | FormPassenger>()
    const { showToast } = useContext(msjContext)
    const [driveSelected, setDriveSelected] = useState<DriverCard | TravelCard>()
    const navigate = useNavigate()

    const infoForm = (formValues: FormDriver | FormPassenger) => {
        setFormInfo(formValues)
    }

    const fetchData = async (formInfo: FormDriver | FormPassenger) => {
        const data = new FormEntity(formInfo)
        data.userId = idUser
        if (isDriver) {
            try {
                const res = await driverService.getPendingTravels(data);
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

    const changePage = (data: DriverCard | TravelCard) => {
        setDriveSelected(data);
        navigate("/confirmation-page", { state: { driver: data, travel: formInfo } });
    };

    useEffect(() => {
        if (formInfo) {
            fetchData(formInfo);
        }
    }, [formInfo]);


    return (
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
    )
}




