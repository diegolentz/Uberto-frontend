import axios from "axios";
import {  driverProfile, DriverProfile, FormEntity } from "../domain/driver";
import { Recommendation, } from "../domain/recomendation";
import { TravelCard, TravelDTO } from "../domain/travel";
import { REST_SERVER_URL } from "./urls";

class DriverService {
   
   
    async getProfile(id: number): Promise<DriverProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/driver`, {
            params: { id: id } 
        });
        return driverProfile.fromJson(response.data);
    }
    
    
    async getImg(id: number): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/driver/img`, {
            params: { driverid: id }
        });
        console.log(response.data.img)
        return response.data;
    }

    async getPendingTravels(data: FormEntity): Promise<TravelCard[]> { 
        const response = await axios.post(`${REST_SERVER_URL}/trip/pending`, data);
        const travels = response.data.map((item: TravelDTO) => TravelCard.prototype.fromDTO(item));
        return travels;
    }

    async updateProfile(data: DriverProfile)  {
        const id = sessionStorage.getItem('userId')
        const response = await axios.post(`${REST_SERVER_URL}/driver`, data, { params: { id: id } })
        return response
    }


    // getRatings(idUser: number) : Promise<Recommendation[]> {
    //     const recom = [recommendation1,recommendation2]
    //     return  Promise.resolve(recom);
    // }
}

export const driverService = new DriverService();