import { Card, CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { Recommendation } from "../../domain/recomendation"
import { AxiosError } from "axios"
import { useContext, useState } from "react"
import { msjContext } from "../viewLayout/viewLayout"
import { scoreCreate, scoreDelete } from "../../services/scores.service"
import { utils } from "../../utils/formatDate"

interface RecommendationCardProps {
    recom: Recommendation;
    handle: () => void
}


export const RecommendationCard = ({recom, handle} : RecommendationCardProps) => {
    const recomEmpty: Recommendation = new Recommendation(0,'',new Date, 0, '', 0, '', true, false, '', '')
    const [recommendation, setRecom] = useState(recom)
    // const id = parseInt(sessionStorage.getItem('idUser')!)
    // const isDriver = sessionStorage.getItem('isDriver') === 'true'
    const { showToast } = useContext(msjContext)
    const userId = parseInt(sessionStorage.getItem("userId")!)

    const handleDelete = async () => {
        try{
            const res = await scoreDelete(userId, recom.tripId)
            showToast(res)
        }catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const handleClose = () =>{
        setRecom({...recomEmpty})
        handle()
    }

    const handleSave = async () => {
        console.log(recommendation)
        try{
            const res = await scoreCreate(recommendation)
            showToast(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
        handle()
    }

    return (
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                {recom.delete && <Button onClick={handleDelete}>Delete</Button>}
                <CardHeader
                avatar={<Avatar src={recom.avatarUrlPassenger} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    {!recom.editMode && <StarIcon sx={{ color: "gold" }} />} 
                    <Typography fontWeight="bold" ml={0.5}>
                        {
                            recom.editMode ? 
                            <Rating
                                    value={recommendation.scorePoints || 0}
                                    precision={0.5}
                                    size="large"
                                    onChange={(_, newValue) => setRecom({ ...recommendation, scorePoints: newValue ?? 0 })}
                                /> : 
                            recom.scorePoints
                        }
                    </Typography>
                    </Box>
                }
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {utils.setDate(recom.date)}
                </Typography>
                    {
                        recom.editMode ? 
                        <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Comentario"
                        value={recommendation.message}
                        onChange={(e) => setRecom({ ...recommendation, message: e.target.value })}
                        sx={{ mt: 2 }}
                    /> : 
                        recom.message
                    }
                </CardContent>
                {
                        recom.editMode ? 
                        <Box component="section" sx={{display:"flex" ,justifyContent:"end" }}>
                            <Button onClick={handleSave}>Guardar</Button>
                            <Button onClick={handleClose}>Cancelar</Button>
                        </Box> : <></>
                    }
                </Card> 
            </>
    )
}
