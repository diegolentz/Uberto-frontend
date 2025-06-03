import axios from "axios";
import { FormValues } from "../components/forms/homeForm";
import { REST_SERVER_URL } from "./urls";

class HomeService {
    async getRedisData() : Promise<FormValues> {
        try {
            const response = await axios.get(`${REST_SERVER_URL}/home`);
            return await response.data
        } catch (error) {
            console.error('Failed to fetch Redis data:', error);
            throw error;
        }
    }
}

export const homeService = new HomeService();