import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { TravelDTO, TravelCard, CreateTravelDTO, PassengerTrips } from "../domain/travel";

class TravelService {
    async createTravel(data:CreateTravelDTO) {
        return await axios.post(`${REST_SERVER_URL}/trip/create`,data) 
    } 

}

export const travelService = new TravelService()

export async function getPassenger():Promise<PassengerTrips> {
    type ResponseType = {
        pendingTrips: TravelDTO[],
        finishedTrips: TravelDTO[]
    }

    const response = await axios.get<ResponseType>(`${REST_SERVER_URL}/trip/profile/passenger`)

    const pending = response.data.pendingTrips.map((trip:TravelDTO)=> TravelCard.prototype.fromDTO(trip))
    const finished = response.data.finishedTrips.map((trip:TravelDTO)=> TravelCard.prototype.fromDTO(trip))

    return {
        pending: pending,
        finished: finished
    };
}


export async function getDriver():Promise<TravelCard[]> {
    
    const res = await axios.get(`${REST_SERVER_URL}/trip/profile/driver`)
    return res.data.finishedTrips.map((item:TravelDTO)=> TravelCard.prototype.fromDTO(item));
} 
