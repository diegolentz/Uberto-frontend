import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, Box, Button, CardContent, CardHeader, IconButton, Rating, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { Recommendation } from "../../domain/recomendation";
import * as styles from "../../utils/cardDriverStyle";
import { utils } from "../../utils/formatDate";
import { StyledCard } from "../../utils/recommendationCardStyles";
import { msjContext } from "../viewLayout/viewLayout";
import { scoreService } from "../../services/scores.service";
import { useLocation } from "react-router-dom";

interface RecommendationCardProps {
    recom: Recommendation;
    createRecomendation: (isSave: boolean) => void;
    deleteRecommendation: (id: number) => void;
}

export const RecommendationCard = ({ recom,deleteRecommendation, createRecomendation }: RecommendationCardProps) => {
    const [recommendation, setRecom] = useState<Recommendation>(recom);
    const { showToast } = useContext(msjContext);
    const isDriver = localStorage.getItem("isDriver") === "true";
    const location = useLocation();
    const isConfirmation = location.pathname.includes("confirmation-page");
    const ratigsDriver = location.pathname.includes("ratings");

    const handleDelete = async () => {
        try {
            const res = await scoreService.scoreDelete(recom.tripId);
            deleteRecommendation(recom.tripId);
            showToast(res);
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!);
        }
    };

    const handlePush = async (isSave: boolean) => {
        if (isSave) {
            try {
                const res = await scoreService.scoreCreate(recommendation);
                setRecom(recommendation);
                showToast(res);
            } catch (e: unknown) {
                showToast((e as AxiosError<unknown>).response!);
            }
            createRecomendation(true);
        } else {
            setRecom(recom);
            createRecomendation(false);
        }
    };

    
    function cardHeaderTitle() {
        return (
            <Avatar
                src={recommendation.avatarUrlImg}
                alt={recommendation.name}
                sx={{ width: 56, height: 56 }}
            />
        );
    }

    function cardHeaderAction() {
        return (
            <Box display="flex" alignItems="center" component="div" sx={{ height: "100%", width: "100%", justifyContent: "space-between" }}>
                {!recom.isEditMode ? (
                    <Rating
                    value={recommendation.scorePoints || 0}
                    precision={1}
                    size="large"
                    sx={{ margin: "0 auto" }}
                    onChange={(_, newValue) => setRecom({ ...recommendation, scorePoints: newValue ?? 0 })}
                    />
                ) : (
                    recom.scorePoints
                )}
                <StarIcon sx={{ color: "gold" }} />
                {!isDriver && ratigsDriver  && (
                    <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
                        <DeleteIcon sx={{ color: "purple" }} />
                    </IconButton>
                )}
            </Box>
        );
    }

    return (
        <StyledCard sx={{ maxWidth: 400, p: 2, borderRadius: 3 }}>
            <CardHeader sx={recom.isEditMode ? { margin: "0 auto" } : { display: "flex" }} title={cardHeaderTitle()} action={cardHeaderAction()} />

            <Typography variant="body2" sx={styles.dataTravelStyle}>
                {`Date: ${utils.setDate(recom.date)}`}
            </Typography>

            <Typography variant="body2" sx={styles.dataTravelStyle}>
                {`To: ${recom.name}`}
            </Typography>


            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Comentario"
                    disabled={recom.isEditMode}
                    value={!recom.isEditMode ? recommendation.message : recom.message}
                    sx={{ mt: 2 }}
                    onChange={(e) => setRecom({ ...recommendation, message: e.target.value })}
                />
            </CardContent>

            {!recom.isEditMode && (
                <Box component="section" sx={{ display: "flex", justifyContent: "space-between", width: "90%", gap: 2, margin: "0 auto", padding: "1rem" }}>
                    <Button size="medium" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold", padding: "0.5rem", width:'5rem' }} onClick={() => handlePush(false)}>
                        Cancel
                    </Button>
                    <Button size="medium" sx={{ backgroundColor: "green", color: "white", fontWeight: "bold", padding: "0.5rem",width:'5rem' }} onClick={() => handlePush(true)}>
                        Save
                    </Button>
                </Box>
            )}
        </StyledCard>
    );
};
