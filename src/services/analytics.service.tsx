import axios from "axios";
import { REST_SERVER_URL } from "./urls";

class AnalyticsService {
    async logClick(driverId: string) {
        const response = await axios.post(`${REST_SERVER_URL}/analytics`, null, 
            { params: { driverId: driverId } })
        return response
    }
}
export const analyticsService = new AnalyticsService();