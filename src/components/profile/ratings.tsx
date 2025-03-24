import { useEffect, useState } from "react"
import { usetOutletProps } from "../../views/profile";
import { useToast } from "../../hooks/toast/useToast";
import { get } from "../../services/scores.service";
import { Recommendation } from "../../domain/recomendation";
import { RecommendationCard } from "../recommendation/recommendation";


export const Ratings = () => {
    const { outletProps } = usetOutletProps()
    const [scores, setScores] = useState<Recommendation[]>([]);
    const toast = useToast()

    async function fetchData() {
        try {
            const data = await get(outletProps?.id!)
            setScores(data)
        }
        catch (error: any) {
            toast.open(error.response.data.message, 'error')
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <>
            <p>mock</p>
            <div>
                
            </div>
            {scores.map((score:Recommendation, index:number)=>(
                <>
                    <RecommendationCard key={index} recom={score} handle={fetchData}/>
                    
                </>
            ))}
        </>
    )

}