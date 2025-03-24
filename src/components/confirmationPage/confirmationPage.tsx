import { Box, Button, Divider, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { DriverCard, FormDriver } from "../../domain/driver"
import { TravelCard, TravelDTO } from "../../domain/travel"
import * as styles from './confirmationStyles'
import { Recommendation } from "../../domain/recomendation"
import { RecommendationCard } from "../recommendation/recommendation"
import { driverService } from "../../services/driver.service"
import { passengerService } from "../../services/passenger.service"
import { travelService } from "../../services/travel.service"
import { AxiosError } from "axios"
import { msjContext } from "../viewLayout/viewLayout"

type HomeConfirmationProps = {
    driver: DriverCard
    travel: FormDriver
    isDriver: boolean
    changePage: (data: DriverCard | TravelCard ) => void
};

export const ConfirmationPage = (
    { driver , travel , isDriver , changePage }: HomeConfirmationProps) => {

    const [travelDTO,setTravelDTO] = useState<TravelDTO>()    
    const [recommendation, setRecommendation] = useState<Recommendation[]>()
    const idUser = parseInt(sessionStorage.getItem("userId")!)
    const {showToast} = useContext(msjContext)
    
    const recommended = async () => {
        if (isDriver) {
            const res = await driverService.profileRatings(idUser)
            setRecommendation(res)
        } else {
            const res = await passengerService.profileRatings(idUser)
            setRecommendation(res)
        }
    }

    const handleDecline = () => {
        changePage(driver)
    }
    const confirmTravel = async () => {
        // Llamar a armarDTO solo si travelDTO aún no está establecido
        if (!travelDTO) {
            armarDTO();
        }
    
        // Esperar a que travelDTO esté listo
        if (travelDTO) {
            try {
                const res = await travelService.createTravel(travelDTO);
                showToast(res);
                handleDecline()
            } catch (e: unknown) {
                showToast((e as AxiosError<unknown>).response!);
            }
        } 
    };

    const armarDTO = () =>{
        const newTravel = new TravelDTO(
            idUser,
            driver.id,
            travel.duration,
            travel.passengers,
            travel.date,
            travel.origin,
            travel.destination,
            driver.price,
            driver.name,
            ""
        )
        console.log(newTravel)
        setTravelDTO(newTravel)
    }

    return (
        <>
            <Typography sx={styles.title} component="div">
                Confirm travel
            </Typography>
            <Typography sx={styles.text} component="div">
                Origin
                <Typography sx={styles.span} component="span">
                    {travel.origin}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Destiny
                <Typography sx={styles.span} component="span">
                    {travel.destination}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Date
                <Typography sx={styles.span} component="span">
                    {new Date(travel.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Duration
                <Typography sx={styles.span} component="span">
                    {travel.duration}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Number of passengers
                <Typography sx={styles.span} component="span">
                    {travel.passengers}
                </Typography>
            </Typography>
            <Divider />
            <Typography sx={styles.title} component="h1">
                {driver.type}
            </Typography>
            <Typography sx={styles.text} component="div">
                Name
                <Typography sx={styles.span} component="span">
                    {driver.name}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Car
                <Typography sx={styles.span} component="span">
                    {driver.brand}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Patent
                <Typography sx={styles.span} component="span">
                    {driver.serial}
                </Typography>
            </Typography>
            <Typography sx={styles.text} component="div">
                Rating
                <Typography sx={styles.span} component="span">
                    {driver.rating}
                </Typography>
            </Typography>
            <Box margin={2} marginBottom={10}>
                {recommendation?.map((reco, index) => (
                    <RecommendationCard key={index} recom={reco} handle={recommended} />
                ))}
            </Box>

            <Box sx={styles.boxButtons}>
                <Button 
                    variant="outlined"
                    color="secondary"
                    onClick={handleDecline}
                >
                    Decline
                </Button>
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={confirmTravel}
                >
                    Confirm
                </Button>
            </Box>
        </>
    )
}
