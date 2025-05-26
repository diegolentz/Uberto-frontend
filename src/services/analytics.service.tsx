import axios from "axios";
import { REST_SERVER_URL } from "./urls";

class AnalyticsService {
    async logClick(driverName: string) {
        const response = await axios.post(`${REST_SERVER_URL}/analytics`, null, 
            { params: { driver_name: driverName } })
        return response
    }
}
export const analyticsService = new AnalyticsService();