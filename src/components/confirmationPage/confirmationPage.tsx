import { Box, Divider, styled, Typography } from "@mui/material"
import { Driver} from "../../domain/driver"
import { Travel } from "../../domain/travel"
import { Recommendation, recommProps } from "../recommendation/recommendation"
import { useState } from "react"
import { ButtonConfirmation } from "./buttonConfirmation"
import * as styles from './confirmationStyles';

const recommendationMock = {
    name: 'Jose Luis',
    date:  Date(),
    rating: 5,
    comment:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facere quae, quas deserunt voluptate neque magni amet asperiores assumenda, suscipit sint nam nisi totam et ab maiores. Soluta, numquam commodi.",
    avatarUrl: "Foto",
    isEdit: false,
    editMode:false
}

export const ConfirmationPage = ({ travel,driver }: { travel: Travel ,driver:Driver }) => {
    const [recommendation,setRecommendation] = useState<recommProps>()

    const recommended = (recommendation:recommProps) =>{
        setRecommendation(recommendation)
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
            <Typography sx={styles.text}>Number of passengers<Typography sx={styles.span}>{travel.pasaenger}</Typography></Typography>
            <Divider></Divider>
            <Typography sx={styles.title}>Driver Premium</Typography>
            <Typography sx={styles.text}>Name <Typography sx={styles.span}>{driver.name}</Typography ></Typography>    
            <Typography sx={styles.text}>Car <Typography sx={styles.span}>{driver.model}</Typography ></Typography>
            <Typography sx={styles.text}>Patent <Typography sx={styles.span}>{driver.patent}</Typography ></Typography>
            <Typography sx={styles.text}>Rating <Typography sx={styles.span}>5</Typography ></Typography>
            <Box margin={2}>
                <Recommendation  recom={recommendationMock} handle={recommended}></Recommendation>
            </Box>
            <ButtonConfirmation></ButtonConfirmation> 
            
        </>
    )
}
