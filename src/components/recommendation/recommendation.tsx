import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { useEffect, useState } from "react"
import { Recommendation } from "../../domain/recomendation"
import { driverService } from "../../services/driver.service"
import { passengerService } from "../../services/passenger.service"

export interface recommProps {
    recom: Recommendation
    handle: (recom: recommProps) => void
}


export const RecommendationCard = ({recom, handle} : recommProps) => {
    const id = parseInt(sessionStorage.getItem('idUser')!)
    const isDriver = sessionStorage.getItem('isDriver') === 'true'
    const [recomOrigin] = useState<Recommendation>(recom)

    const getRecommendation = async () => {
        //traigo la recomendacion del back
            const res = isDriver ? driverService.profileRatings(id) : passengerService.profileRatings(id)
            setRatings(res)
    }

    useEffect(() => {
        isDriver ? recom.editMode = false : recom.editMode = true
        getRecommendation()

    }, []); 

    const saveChange = async() => {
        //pego al back los cambios
        alert('guardo cambios en el back')
        recom.editMode = false
        setRatings({
            ...recom, editMode: false,
        })
    }

    const handleCloseEdit = () => {
        console.log('recom original ', recomOrigin)
        console.log('recom ', recom)
        setRatings(recomOrigin)
    }

    return (
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                avatar={<Avatar src={recom.avatarUrl} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    {!recom.editMode && <StarIcon sx={{ color: "gold" }} />} 
                    <Typography fontWeight="bold" ml={0.5}>
                        {
                            recom.editMode ? 
                            <Rating value={recom.rating} 
                            onChange={(_, newValue) => handle({...recom, rating:newValue || recom.rating})} 
                            precision={0.5} size="large"/> : 
                            recom.rating
                        }
                    </Typography>
                    </Box>
                }
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {recom.date.toString()}
                </Typography>
                    {
                        recom.editMode ? 
                        <TextField fullWidth multiline rows={3} label="Comentario" value={recom.comment} 
                        onChange={(e) => handle({...recom, comment:e.target.value})} 
                        sx={{ mt: 2 }}/> : 
                        recom.comment
                    }
                </CardContent>
                {
                        recom.editMode ? 
                        <Box component="section" sx={{display:"flex" ,justifyContent:"end" }}>
                            <Button onClick={handleCloseEdit}>Cancelar</Button>
                            <Button onClick={saveChange}>Guardar</Button>
                        </Box> : <></>
                    }
                </Card> 
            </>
    )
}