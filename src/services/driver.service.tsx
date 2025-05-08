import axios from "axios";
import { driverProfile, DriverProfile, FormEntity } from "../domain/driver";
import { TravelCard, TravelDTO } from "../domain/travel";
import { REST_SERVER_URL } from "./urls";
import {token} from "../security/token"
class DriverService {
   
   
    async getProfile(): Promise<DriverProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/driver`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return driverProfile.fromJson(response.data);
    }
    
    
    async getImg(): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/driver/img`, {
            headers:{'Authorization': `Bearer ${token.getToken()}`}
        });
        return response.data.img;
    }

    async getPendingTravels(data: FormEntity): Promise<TravelCard[]> { 
        const response = await axios.get(`${REST_SERVER_URL}/trip/pending`, {
            params:{
                origin: data.origin,
                destination: data.destination,
                name: data.name,
                numberPassenger: data.numberPassengers
            },
            headers:{'Authorization': `Bearer ${token.getToken()}`}
        });
        const travels = response.data.map((item: TravelDTO) => TravelCard.prototype.fromDTO(item));
        return travels;
    }

    async updateProfile(data: DriverProfile) {
        const response = await axios.post(`${REST_SERVER_URL}/driver`, data,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response;
    }
}

export const driverService = new DriverService();