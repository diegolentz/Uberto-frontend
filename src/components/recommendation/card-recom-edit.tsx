import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import { recommPropsEdit } from "./recommendation"
import { useState } from "react";

export const CardRecomEdit = ({recom} : {recom: recommPropsEdit}) => {
    const [rating, setRating] = useState(recom.rating);
    const [comment, setComment] = useState(recom.comment);

    const saveChange = async() => {
        //pego al back los cambios
        alert('guardo cambios en el back')
        recom.handle()
    }
    return(
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                avatar={<Avatar src={recom.avatarUrl} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    {/* <StarIcon sx={{ color: "gold" }} /> */}
                    <Typography fontWeight="bold" ml={0.5}>
                    <Rating
                    value={recom.rating}
                    onChange={(_, newValue) => setRating(newValue || rating)}
                    precision={0.5}
                    size="large"
                    />
                    </Typography>
                    </Box>
                }
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {recom.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {recom.date}
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mt: 2 }}
                />
                </CardContent>
                <Box component="section" sx={{display:"flex" ,justifyContent:"end" }}>
                    <Button onClick={saveChange}>Guardar</Button>
                    <Button onClick={recom.handleCloseEdit}>Cancelar</Button>
                </Box>
                </Card> 
            </>
    )
}