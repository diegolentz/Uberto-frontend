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
    { driver, travel, changePage }: HomeConfirmationProps) => {

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
            <Typography sx={styles.title} component="div">
                Driver Premium
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
                    {driver.model}
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
                >
                    Confirm
                </Button>
            </Box>
        </>
    )
}
