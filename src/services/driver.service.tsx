import axios from "axios";
import { driverProfile, DriverProfile, FormEntity } from "../domain/driver";
import { TravelCard, TravelDTO } from "../domain/travel";
import { REST_SERVER_URL } from "./urls";
import {token} from "../security/token"
class DriverService {
   
   
    async getProfile(id: number): Promise<DriverProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/driver/${id}`,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return driverProfile.fromJson(response.data);
    }
    
    
    async getImg(id: number): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/driver/img`, {
            params: { driverid: id },
            headers:{'Authorization': `Bearer ${token.getToken()}`}
        });
        return response.data.img;
    }

    async getPendingTravels(data: FormEntity): Promise<TravelCard[]> { 
        const response = await axios.get(`${REST_SERVER_URL}/trip/pending`, {
            params:{
                origin: data.origin,
                destination: data.destination,
                driverId: data.userId,
                name: data.name,
                numberPassenger: data.numberPassengers
            },
            headers:{'Authorization': `Bearer ${token.getToken()}`}
        });
        const travels = response.data.map((item: TravelDTO) => TravelCard.prototype.fromDTO(item));
        return travels;
    }

    async updateProfile(data: DriverProfile) {
        const id = Number(sessionStorage.getItem('userId')!);
        const updatedData = { ...data, id };
        const response = await axios.post(`${REST_SERVER_URL}/driver`, updatedData,
            {headers:{'Authorization': `Bearer ${token.getToken()}`}}
        );
        return response;
    }
}

export const driverService = new DriverService();