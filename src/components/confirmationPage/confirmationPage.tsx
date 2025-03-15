import { Divider, styled, Typography } from "@mui/material"
import { Driver, Travel } from "../../domain/driver"
import { Recommendation } from "../recommendation/recommendation"

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


export const ConfirmationPage = ({ travel,driver }: { travel: Travel ,driver:Driver }) => {
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

            <Recommendation></Recommendation>
        </>
    )
}
