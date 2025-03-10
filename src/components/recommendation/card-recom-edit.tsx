import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { recommProps } from "./recommendation"
import { useState } from "react";

export const CardRecomEdit = ({recom} : {recom: recommProps}) => {
    const [rating, setRating] = useState(recom.rating);
    const [comment, setComment] = useState(recom.comment);
    return(
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                avatar={<Avatar src={recom.avatarUrl} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    <StarIcon sx={{ color: "gold" }} />
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
                <Typography mt={1} variant="body1">
                <TextField
            fullWidth
            multiline
            rows={3}
            label="Comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
                </Typography>
                </CardContent>
                </Card> 
                <Button>Guardar</Button>
            </>
    )
}