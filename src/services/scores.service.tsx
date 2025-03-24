import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import {  TravelDTO } from "../domain/travel";

export async function get(id: number, role:string):Promise<TravelCard[]> {
    const promise = axios.get<TravelDTO[]>(REST_SERVER_URL + '/trip', {
        params:{
            userId:id,
            userRole:role
        }
    })
    const response = await promise
    const travels = response.data.map((item:TravelDTO)=> TravelCard.prototype.fromDTO(item))
    return travels;
} 
