import { AxiosError } from "axios"
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
    const {showToast} = useContext(msjContext)
    const [driveSelected, setDriveSelected] = useState<DriverCard | TravelCard>()

    const infoForm = (formValues: FormDriver | FormPassenger) => {
        setFormInfo(formValues)
    }

    // creo un entity con la info qe necesita el back para traer los datos
    //  y casteo el tipo de formulario que tengo guardado en formInfo para poder pasarlo lo que necesito
    // dpendiendo del rol se llama a una funcion u otra

const fetchData = async (formInfo: FormDriver | FormPassenger) => {
    const data = new FormEntity(formInfo)
    if (isDriver) {
        try {
            const res = await driverService.getPendingTravels(data);
            setCard(res as unknown as TravelCard[])
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    } else {
        try {
            const res = await passengerService.getAvailableDrivers(data);
            setCard(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }
};

    // atrapo los datos del chofer clickeado y cambio de pantalla
    const changePage = (data: DriverCard | TravelCard) => {
        setDriveSelected(data)
        setIsHome(!isHome)
    }

    useEffect(() => {
        if (formInfo) {
            fetchData(formInfo);
        }
    }, [formInfo]); 
    

    return (
        <>
            {isHome ? (
                <>
                    <HomeForm setInfo={infoForm}  fetchData={fetchData}/>

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
