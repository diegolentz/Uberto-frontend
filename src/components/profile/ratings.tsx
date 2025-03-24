import { RatingClassKey } from "@mui/material";
import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Recommendation } from "../../domain/recomendation";
import { get } from "react-hook-form";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";
import { RecommendationCard, recommProps } from "../recommendation/recommendation";
import { usetOutletProps } from "../../views/profile";


export const Ratings = () => {
    const { outletProps } = usetOutletProps()
    const [ratings, setRatings] = useState<Recommendation[]>([]);

    return (
        <>  
            {outletProps?.isDriver ?
                <p>Scores Recibidos</p> :
                <p>Scores Realizados</p>
            }

            {/* {ratings.map((rating, index) => (
                <RecommendationCard recom={rating} handle={DeleteRating}></RecommendationCard>
            ))} */}

        </>
    )

}