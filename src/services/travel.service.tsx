import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { Trip } from "../domain/travel";

class TravelService {

    async createTravel(data:Trip) {
        await axios.post((`${REST_SERVER_URL}/trip/cerate`,data)) 
    } 

}

export const travelService = new TravelService()