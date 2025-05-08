import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { Recommendation } from "../domain/recomendation";
import {token} from "../security/token"
class ScoreService{
    
    async getPassengerRatings(): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/passenger`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response.data;
    }

    async getDriverRatings(): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/driver`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response.data;
    }

    async getScoreConfirmation(driverId : number): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/confirmation?driverId=${driverId}`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response.data;
    }


    
    async scoreDelete(tripId: number) {
        return await axios.delete(`${REST_SERVER_URL}/tripScore`, {
            params: { tripId },
            headers:{'Authorization': `Bearer ${token.getToken()}`}
        });
    }
    
    async scoreCreate(recom: Recommendation) {
        return await axios.post(`${REST_SERVER_URL}/tripScore`, recom,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
    }

}
export const scoreService = new ScoreService();