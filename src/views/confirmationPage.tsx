import { Box, Button, Divider, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RecommendationCard } from "../components/cards/recommendation"
import { msjContext } from "../components/viewLayout/viewLayout"
import { DriverCard } from "../domain/driver"
import { FormPassenger } from "../domain/passenger"
import { Recommendation } from "../domain/recomendation"
import { CreateTravelDTO, } from "../domain/travel"
import { scoreService } from "../services/scores.service"
import { travelService } from "../services/travel.service"
import * as styles from '../utils/confirmationStyles'
import { utils } from "../utils/formatDate"

export const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {showToast} = useContext(msjContext)
    const { driver, travel }: { driver: DriverCard; travel: FormPassenger } = location.state;
    const starTime = utils.setStartTime(travel.date)
    const endTime = utils.setEndTime(travel.date,travel.duration)
    const [recommendation, setRecommendation] = useState<Recommendation[]>()
    const idUser = parseInt(localStorage.getItem("userId")!)

    const recommended = async () => {
        try{
            const res = await scoreService.getScoreConfirmation(driver.id)
            setRecommendation(res)
        }catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!);
        }
    }

    useEffect(() => {
        recommended()
    }, [])

    if (!location.state) {
        navigate("/");
        return null;
    }

    const handleDecline = () => {
        navigate("/Home");
    };

    const handleConfirm = async () => {  

        const newTravel = new CreateTravelDTO(
            idUser,
            driver.id,
            travel.duration,
            travel.passengers,
            travel.date,
            travel.origin,
            travel.destination,
            driver.price,
            driver.name,
            "",
            starTime,
            endTime
        );
    
        try {
            const res = await travelService.createTravel(newTravel);
            showToast(res); 
            handleDecline(); 
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!); 
        }
    };

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
                    {
                    new Date(travel.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                    
                    }
                    {` ${starTime} - ${endTime}hs`}
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
            
            <Box margin={2} marginBottom={10} gap={2} display="flex" flexDirection="column">
                {recommendation?.map((reco, index) => (
                    <RecommendationCard key={index} recom={reco} createRecomendation={function (): void {
                    } } deleteRecommendation={function (id: number): void {
                    } } />
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
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Box>
        </>
    )
}
