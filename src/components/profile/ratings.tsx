import { RatingClassKey } from "@mui/material";
import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Recommendation } from "../../domain/recomendation";
import { get } from "react-hook-form";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";
import { RecommendationCard, recommProps } from "../recommendation/recommendation";


export const Ratings = () => {
    const idUser = parseInt(sessionStorage.getItem('idUser')!);
    const isDriver = sessionStorage.getItem('isDriver') === 'true';
    const [ratings, setRatings] = useState<Recommendation[]>([]);

    const getRatings = async () => {
        if (isDriver){
            const res = await driverService.getRatings(idUser)
            setRatings(res)
        }else{
            const res = await passengerService.getRatings(idUser)
            setRatings(res)
        }
    }
    const DeleteRating = async (idreco : number) => {
        const reco = ratings.filter((reco) => reco.id == idreco)
        setRatings(reco)

        await passengerService.deleteRecom(idreco,idUser)
    }

   useEffect(() => {
    getRatings()

   }, [ratings])


    return (
        <>
        {ratings.map((rating, index) => (
      <RecommendationCard recom={rating} handle={DeleteRating}></RecommendationCard>
        ))}

        </>
    )
    
}