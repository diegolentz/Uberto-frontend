import { Box, Button, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { DriverCard, FormDriver } from "../../domain/driver"
import { TravelCard } from "../../domain/travel"
import * as styles from './confirmationStyles'
import { Recommendation } from "../../domain/recomendation"
import { RecommendationCard } from "../recommendation/recommendation"
import { driverService } from "../../services/driver.service"
import { passengerService } from "../../services/passenger.service"

type HomeConfirmationProps = {
    driver: DriverCard
    travel: FormDriver
    changePage: (data: DriverCard | TravelCard ) => void
};

export const ConfirmationPage = (
    { driver,travel,changePage }: HomeConfirmationProps) => {

    const [recommendation, setRecommendation] = useState<Recommendation[]>()
    const id = parseInt(sessionStorage.getItem('idDriver')!)
    const isDriver = sessionStorage.getItem('isDriver') == "isDriver"
    
    const recommended = async () => {
        if (isDriver) {
            const res = await driverService.profileRatings(id)
            setRecommendation(res)
        } else {
            const res = await passengerService.profileRatings(id)
            setRecommendation(res)
        }

    }
    useEffect(() => {
        recommended()
        console.log(travel.passengers)

    }, [])

    const handleDecline = () => {
        changePage(driver)
    }

    return (
        <>
            <Typography sx={styles.title} >Confirm travel</Typography>
            <Typography sx={styles.text} >Origin<Typography sx={styles.span}>{travel.origin}</Typography></Typography> {/* Aquí puedes poner el valor correspondiente */}
            <Typography sx={styles.text}>Destiny<Typography sx={styles.span}>{travel.destination}</Typography></Typography>
            <Typography sx={styles.text}>Date
                <Typography sx={styles.span}>
                    {new Date(travel.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Typography>
            </Typography>
            <Typography sx={styles.text}>Duration<Typography sx={styles.span}>60</Typography></Typography>
            <Typography sx={styles.text}>Number of passengers<Typography sx={styles.span}>{travel.passengers}</Typography></Typography>
            <Divider></Divider>
            <Typography sx={styles.title}>Driver Premium</Typography>
            <Typography sx={styles.text}>Name <Typography sx={styles.span}>{driver.name}</Typography ></Typography>
            <Typography sx={styles.text}>Car <Typography sx={styles.span}>{driver.model}</Typography ></Typography>
            <Typography sx={styles.text}>Patent <Typography sx={styles.span}>{driver.patent}</Typography ></Typography>
            <Typography sx={styles.text}>Rating <Typography sx={styles.span}>5</Typography ></Typography>
            <Box margin={2} marginBottom={10}>
                {recommendation?.map((reco, index) =>
                    (
                        <RecommendationCard key={index} recom={reco} handle={recommended}></RecommendationCard>

                    )
                )}

            </Box>

            <Box 
                sx = {styles.boxButtons}
            >
                <Button 
                    variant="outlined"
                    color="secondary"
                    onClick={handleDecline}
                >
                    decline
                </Button>
                <Button 
                    variant="contained"
                    color="secondary"
                >
                    Confirm
                </Button>
            </Box>

        </>
    )
}
