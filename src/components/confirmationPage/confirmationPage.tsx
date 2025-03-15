import { Box, Divider, styled, Typography } from "@mui/material"
import { Driver} from "../../domain/driver"
import { Travel } from "../../domain/travel"

import { Recommendation, recommProps } from "../recommendation/recommendation"
import { useState } from "react"

const Title = styled(Typography)(({ theme }) => ({
    fontSize: 30,
    margin: 10,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color:'#430c8c'
}))

const Text = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    margin: 5,
    fontFamily: 'sans-serif',
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    fontWeight: 'bold'
}))

const Span = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    margin: 5,
    fontFamily: 'sans-serif',
    textAlign: 'end',
}))

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
            <Title >Confirm travel</Title>  
            <Text>Origin<Span>{travel.origin}</Span></Text> {/* Aquí puedes poner el valor correspondiente */}
            <Text>Destiny<Span>{travel.destination}</Span></Text>
            <Text>Date
            <Span>
                    {new Date(travel.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Span>
            </Text>
            <Text>Duration
                <Span>
                    60
                </Span>
                </Text>
            <Text>Number of passengers<Span>{travel.pasaenger}</Span></Text>
            <Divider></Divider>
            <Title>Driver Premium</Title>
            <Text>Name <Span>{driver.name}</Span></Text>    
            <Text>Car <Span>{driver.model}</Span></Text>
            <Text>Patent <Span>{driver.patent}</Span></Text>
            <Text>Rating <Span>5</Span></Text>
            <Box margin={2}>
                <Recommendation  recom={recommendationMock} handle={recommended}></Recommendation>

            </Box>

            
        </>
    )
}
