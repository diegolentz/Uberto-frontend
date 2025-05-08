import axios from "axios";
import { driverProfile, DriverProfile, FormEntity } from "../domain/driver";
import { TravelCard, TravelDTO } from "../domain/travel";
import { REST_SERVER_URL } from "./urls";
class DriverService {

    async getProfile(): Promise<DriverProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/driver`
        );
        return driverProfile.fromJson(response.data);
    }
    
    
    async getImg(): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/driver/img`);
        return response.data.img;
    }

    async getPendingTravels(data: FormEntity): Promise<TravelCard[]> { 
        const response = await axios.get(`${REST_SERVER_URL}/trip/pending`, {
            params:{
                origin: data.origin,
                destination: data.destination,
                name: data.name,
                numberPassenger: data.numberPassengers
            }
        });
        const travels = response.data.map((item: TravelDTO) => TravelCard.prototype.fromDTO(item));
        return travels;
    }

    async updateProfile(data: DriverProfile) {
        const response = await axios.post(`${REST_SERVER_URL}/driver`, data
        );
        return response;
    }
}

export const driverService = new DriverService();