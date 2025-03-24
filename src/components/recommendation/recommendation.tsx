import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { useEffect, useState } from "react"
import { Recommendation } from "../../domain/recomendation"
import { driverService } from "../../services/driver.service"
import { passengerService } from "../../services/passenger.service"

export interface recommProps {
    recom: Recommendation
    handle: (recom: number) => void
}


export const RecommendationCard = ({recom, handle} : recommProps) => {
    const id = parseInt(sessionStorage.getItem('idUser')!)
    const isDriver = sessionStorage.getItem('isDriver') === 'true'

    const deleteRating = (id: number) => {
        handle(id)
    }
     

    return (
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                avatar={<Avatar src={recom.avatarUrlPassenger} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    {!recom.editMode && <StarIcon sx={{ color: "gold" }} />} 
                    <Typography fontWeight="bold" ml={0.5}>
                        {
                            recom.editMode ? 
                            <Rating value={recom.scorePoints} 
                            precision={0.5} size="large"/> : 
                            recom.scorePoints
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
                        <TextField fullWidth multiline rows={3} label="Comentario" value={recom.message} 
                        sx={{ mt: 2 }}/> : 
                        recom.message
                    }
                </CardContent>
                {
                        recom.editMode ? 
                        <Box component="section" sx={{display:"flex" ,justifyContent:"end" }}>
                            <Button onClick={() => deleteRating(recom.id)}>Guardar</Button>
                        </Box> : <></>
                    }
                </Card> 
            </>
    )
}