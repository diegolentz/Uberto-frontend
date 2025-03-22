import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { CardDriver } from "../components/card-viajes/cardDriver"
import { ConfirmationPage } from "../components/confirmationPage/confirmationPage"
import { HomeForm } from "../components/homeForm/homeForm"
import { msjContext } from "../components/viewLayout/viewLayout"
import { passengerService } from "../services/passenger.service"
import { driverService } from "../services/driver.service"
import { DriverCard, FormDriver, FormEntity } from "../domain/driver"
import { TravelCard } from "../domain/travel"
import { FormPassenger } from "../domain/passenger"
import { data } from "react-router-dom"

// se obtiene el id y rol del sessionStorage rednderizo formulario correspondiente, 
// el formulario se llena en formInfo ya sea de tipo FormDriver o FormPassenger
// se cambia de pagina si se selecciona un viaje o un conductor y setea formulario y render condicional
// se setea chofer que se clickeo y se pasa a la pagina de confirmacion
// se renderiza el formulario o la pagina de confirmacion

export const Home = () => {
    parseInt(sessionStorage.getItem("idUser")!)
    const isDriver = sessionStorage.getItem("isDriver") === "true"
    const [card, setCard] = useState<DriverCard[] | TravelCard[] | null>(null)
    const [isHome, setIsHome] = useState<boolean>(true)
    const [formInfo, setFormInfo] = useState<FormDriver | FormPassenger>()
    useContext(msjContext)
    const [driveSelected, setDriveSelected] = useState<DriverCard | TravelCard>()

    const infoForm = (formValues: FormDriver | FormPassenger) => {
        console.log(formValues)
        setFormInfo(formValues)
        fetchData(formValues)
    }

    // creo un entity con la info qe necesita el back para traer los datos
    //  y casteo el tipo de formulario que tengo guardado en formInfo para poder pasarlo lo que necesito
    // dpendiendo del rol se llama a una funcion u otra

    const fetchData = async (formInfo: FormDriver | FormPassenger) => {
        const data = new FormEntity(formInfo)

        const getPendingsTravels = async (data: FormEntity) => {
            const res = await driverService.getPendingTravels(data);
            return res;
        }

        const getAvailableDrivers = async (data: FormEntity) => {
            const res = await passengerService.getAvailableDrivers(data);
            return res;
        }

        if (isDriver) {
            const res = await getPendingsTravels(data)
            setCard(res)
        } else {
            const res = await getAvailableDrivers(data)
            setCard(res)
        }
    };
    // atrapo los datos del chofer clickeado y cambio de pantalla
    const changePage = (data: DriverCard | TravelCard) => {
        setDriveSelected(data)
        setIsHome(!isHome)
    }

    useEffect(() => {
    }, []);

    return (
        <>
            {isHome ? (
                <>
                    <HomeForm setInfo={infoForm} />

                    {card?.map((item, index) => (
                        <CardDriver
                            key={index}
                            value={item}
                            onClick={() => changePage(item)}
                            isDriver={isDriver}
                        />
                    ))}
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
