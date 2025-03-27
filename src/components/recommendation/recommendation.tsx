import { CardHeader, CardContent, Typography, Avatar, Box, TextField, Rating, Button, Paper, styled, IconButton } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import DeleteIcon from "@mui/icons-material/Delete"
import { Recommendation } from "../../domain/recomendation"
import { AxiosError } from "axios"
import { useContext, useState } from "react"
import { msjContext } from "../viewLayout/viewLayout"
import { scoreCreate, scoreDelete } from "../../services/scores.service"
import { utils } from "../../utils/formatDate"
import { Role } from "../../views/profile"
import { StyledCard } from "../../utils/recommendationCardStyles"
import { Height, Style } from "@mui/icons-material"
import * as styles from '../card-viajes/cardDriverStyle';

interface RecommendationCardProps {
    recom: Recommendation;
    handle: () => void
}

export const RecommendationCard = ({ recom, handle }: RecommendationCardProps) => {
    const recomEmpty: Recommendation = new Recommendation(0, '', new Date, 0, '', 0, '', true, false, '', '')
    const [recommendation, setRecom] = useState(recom)
    const { showToast } = useContext(msjContext)
    const userId = parseInt(sessionStorage.getItem("userId")!)
    const role = sessionStorage.getItem("role") as Role
    const handleDelete = async () => {
        try {
            const res = await scoreDelete(userId, recom.tripId)
            showToast(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const handleClose = () => {
        setRecom({ ...recomEmpty })
        handle()
    }

    const handleSave = async () => {
        try {
            const res = await scoreCreate(recommendation)
            showToast(res)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
        handle()
    }

    function cardHeaderTitle() {
        return <>
            {(recom.editMode) ? (
                <Avatar src={recom.avatarUrlPassenger} alt={recom.name} sx={{ width: 56, height: 56 }} />
            ): (
                    <Avatar src={recom.avatarUrlDriver} alt={recom.name} sx={{ width: 56, height: 56 }} />)
                }
        </>
    }

    function cardHeaderAction() {
        return <Box display="flex" alignItems="center" component='div'sx={{height: "100%", width: "100%", justifyContent: "space-between"}}>
            {!recom.editMode &&
                <StarIcon  sx={{ color: "gold" }} />
            }
            {recom.editMode ?
                <Rating value={recommendation.scorePoints || 0} precision={0.5} size="large" sx={{margin: '0 auto'}}
                    onChange={(_, newValue) =>
                        setRecom({ ...recommendation, scorePoints: newValue ?? 0 })
                    }
                /> :
                recom.scorePoints
            }
            {!recom.editMode && recom.delete &&
                <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
                    <DeleteIcon sx={{ color: "purple" }} />
                </IconButton>
            }
        </Box>
    }
    return (
        <>
            <StyledCard sx={{ maxWidth: 400, p: 2, borderRadius: 3 }}>

                {recom.editMode ? (
                    <CardHeader sx={{margin: '0 auto'}}
                    title={cardHeaderTitle()} action={cardHeaderAction()}
                    />) : (
                        <CardHeader
                        title={cardHeaderTitle()} action={cardHeaderAction()}
                    />)
                }

                <Typography variant="body2"  sx={styles.dataTravelStyle}>
                    {`Date: ${utils.setDate(recom.date)}`}
                </Typography>

                <Typography variant="body2" sx={styles.dataTravelStyle} >
                    {role == 'passenger' ? `To: ${recom.driverName}` : `From: ${recom.passengerName}`}
                </Typography>

                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField fullWidth multiline rows={3} label="Comentario" disabled={!recom.editMode}
                        value={recom.editMode ? recommendation.message : recom.message} sx={{ mt: 2 }}
                        onChange={(e) => setRecom({ ...recommendation, message: e.target.value })}
                    />
                </CardContent>
                {recom.editMode ?
                    <Box component="section" sx={{ display: "flex", justifyContent: 'space-between', width: "90%", gap: 2, margin: "0 auto", padding: "1rem" }}>

                        <Button size="medium" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold", padding: '0.5rem' }} onClick={handleClose}>Cancelar</Button>
                        <Button size="medium" sx={{ backgroundColor: "green", color: "white", fontWeight: "bold" }} onClick={handleSave}>Guardar</Button>
                    </Box> : <></>
                }
            </StyledCard>
        </>
    )
}
