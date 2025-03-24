import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import {  TravelDTO } from "../domain/travel";

class TravelService {

    async createTravel(data:TravelDTO) {
        console.log(data)
        return await axios.post(`${REST_SERVER_URL}/trip/create`,data) 
    } 

}

export const travelService = new TravelService()