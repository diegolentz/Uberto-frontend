import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { Recommendation } from "../domain/recomendation";

export async function get(userId: number): Promise<Recommendation[]> {
    const response = await axios.get(`${REST_SERVER_URL}/TripScore`, {
        params: { userId: userId }
    });
    return response.data;
}

export async function scoreDelete(userId: number, tripId: number) {
    return await axios.delete(`${REST_SERVER_URL}/TripScore`, {
        params: { userId, tripId }
    });
}

export async function scoreCreate(recom: Recommendation) {
    return await axios.post(`${REST_SERVER_URL}/TripScore`, recom);
}