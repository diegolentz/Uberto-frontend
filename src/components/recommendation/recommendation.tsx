import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { useEffect, useRef } from "react"

export interface recommProps {
    name: string
    date: string
    rating: number
    comment: string
    avatarUrl: string
    isEdit: boolean
    editMode: boolean
}


export const Recommendation = ({recom, handle} : {recom:recommProps, handle: (recom: recommProps) => void}) => {

    const recomOrigin = useRef<recommProps>({...recom, editMode: false});

    useEffect(() => {
        // Solo establecer recomOrigin la primera vez
        if (!recomOrigin.current) {
            recomOrigin.current = {...recom, editMode: false};
        }
    }, []); 

    const saveChange = async() => {
        //pego al back los cambios
        alert('guardo cambios en el back')
        recom.editMode = false
        handle({...recom, editMode:false})
    }

    const handleCloseEdit = () => {
        console.log('recom original ', recomOrigin)
        console.log('recom ', recom)
        handle(recomOrigin.current)
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
                    {recom.date}
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