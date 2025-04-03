import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { TravelDTO, TravelCard, CreateTravelDTO, PassengerTrips } from "../domain/travel";

class TravelService {

    async createTravel(data:CreateTravelDTO) {
        return await axios.post(`${REST_SERVER_URL}/trip/create`,data) 
    } 

}

export const travelService = new TravelService()

export async function getPassenger(id: number, role:string):Promise<PassengerTrips> {
    type ResponseType = {
        pendingTrips: TravelDTO[],
        finishedTrips: TravelDTO[]
    }
    const promise = axios.get<ResponseType>(REST_SERVER_URL + '/trip/passenger', {
        params:{
            id:id,
            rol:role
        }
    })

    const response = await promise

    const pending = response.data.pendingTrips.map((trip:TravelDTO)=> TravelCard.prototype.fromDTO(trip))
    const finished = response.data.finishedTrips.map((trip:TravelDTO)=> TravelCard.prototype.fromDTO(trip))

    return {
        pending: pending,
        finished: finished
    };
}


export async function getDriver(id: number, role:string):Promise<TravelCard[]> {
    
    const promise = axios.get<TravelDTO[]>(REST_SERVER_URL + '/trip', {
        params:{
            id:id,
            rol:role
        }
    })
    const response = await promise
    return response.data.map((item:TravelDTO)=> TravelCard.prototype.fromDTO(item));
} 
