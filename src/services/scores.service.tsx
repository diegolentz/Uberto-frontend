import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { Recommendation } from "../domain/recomendation";

class ScoreService{
    
    async getPassengerRatings(): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/passenger`);
        return response.data;
    }

    async getDriverRatings(): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/driver`);
        return response.data;
    }

    async getScoreConfirmation(driverId : number): Promise<Recommendation[]> {
        const response = await axios.get(`${REST_SERVER_URL}/tripScore/confirmation?driverId=${driverId}`);
        return response.data;
    }


    
    async scoreDelete(tripId: number) {
        return await axios.delete(`${REST_SERVER_URL}/tripScore`, {
            params: { tripId }
        });
    }
    
    async scoreCreate(recom: Recommendation) {
        return await axios.post(`${REST_SERVER_URL}/tripScore`, recom);
    }

}
export const scoreService = new ScoreService();