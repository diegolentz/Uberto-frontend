import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { TravelDTO, TravelCard } from "../domain/travel";
import { DriverCard } from "../domain/driver";

class TravelService {

    async createTravel(data:TravelDTO) {
        return await axios.post(`${REST_SERVER_URL}/trip/create`,data) 
    } 

}

export const travelService = new TravelService()

export async function getPassengerPending(id: number, role:string):Promise<TravelCard[]> {
    const promise = axios.get<TravelDTO[]>(REST_SERVER_URL + '/trip/pending', {
        params:{
            id:id,
            rol:role
        }
    })
    const response = await promise
    const travels = response.data.map((item:TravelDTO)=> TravelCard.prototype.fromDTO(item))
    return travels;
}

export async function getPassengerFinished(id: number, role:string):Promise<TravelCard[]> {
    const promise = axios.get<TravelDTO[]>(REST_SERVER_URL + '/trip/finished', {
        params:{
            id:id,
            rol:role
        }
    })
    const response = await promise
    const travels = response.data.map((item:TravelDTO)=> TravelCard.prototype.fromDTO(item))
    return travels;
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
