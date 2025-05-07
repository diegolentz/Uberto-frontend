import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { RecommendationCard } from "../../components/cards/recommendation";
import { Recommendation } from "../../domain/recomendation";
import { useToast } from "../../hooks/toast/useToast";
import { scoreService } from "../../services/scores.service";


export const Ratings = () => {
    const isDriver = localStorage.getItem('isDriver') === 'true'
    const [scores, setScores] = useState<Recommendation[]>([]);
    const toast = useToast()

    async function fetchData() {
        try {
            if (isDriver) {
                const data = await scoreService.getDriverRatings()
                setScores(data)

            }else {
                const data = await scoreService.getPassengerRatings()
                setScores(data)
            }
        }
        catch (error: any) {
            toast.open(error.response.data.message, 'error')
        }
    }
    
    function deleteScore(id:number){
        setScores(
            scores.filter(score => score.tripId !== id)
        );
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Box sx={{height:'100%', padding:'1rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
                {scores.map((score: Recommendation) => (
                    <>
                        <RecommendationCard key={score.tripId} recom={score} deleteRecommendation={deleteScore} createRecomendation={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
                    </>
                ))}
            </Box>

        </>
    )

}