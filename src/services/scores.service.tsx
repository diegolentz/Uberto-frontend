import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { Recommendation } from "../domain/recomendation";
import {token} from "../security/token"
class ScoreService{
    
    async getDriverRatings(userId: number): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/driver/${userId}`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response.data;
    }

    async getPassengerRatings(userId: number): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/passenger/${userId}`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response.data;
    }
    
    async scoreDelete(userId: number, tripId: number) {
        return await axios.delete(`${REST_SERVER_URL}/tripScore`, {
            params: { userId, tripId },
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