import { useEffect, useState } from "react"
import { useToast } from "../../hooks/toast/useToast";
import { get } from "../../services/scores.service";
import { Recommendation } from "../../domain/recomendation";
import { RecommendationCard } from "../../components/cards/recommendation";
import { Box } from "@mui/material";


export const Ratings = () => {
    const idUser = parseInt(sessionStorage.getItem('userId')!)
    const isDriver = sessionStorage.getItem('isDriver') === 'true'
    const [scores, setScores] = useState<Recommendation[]>([]);
    const toast = useToast()

    async function fetchData() {
        try {
            const data = await get(idUser)
            setScores(data)
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
                        <RecommendationCard key={score.tripId} recom={score} deleteRecommendation={deleteScore} handle={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
                    </>
                ))}
            </Box>

        </>
    )

}