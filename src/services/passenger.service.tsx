import axios from "axios";
import { FormEntity } from "../domain/driver";
import { Friends, passengerProfile, PassengerProfile } from "../domain/passenger";
import { Recommendation } from "../domain/recomendation";
import { REST_SERVER_URL } from "./urls";

class PassengerService {
    
    async profileRatings(): Promise<Recommendation[]> {
        const res = await axios.get(`${REST_SERVER_URL}/tripScore/driver`)
        console.log(res);

        return res.data;
    }


    async getImg(): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/img`);
        return response.data.img;
    }


    async getAvailableDrivers(data: FormEntity) {
        const response = await axios.get(`${REST_SERVER_URL}/driver/available`, {
            params: { 
                date: data.date,
                origin: data.origin,
                destination: data.destination,
                numberpassengers: data.numberPassengers
            }
        });
        
        return response.data;
    }


    async getProfile(): Promise<PassengerProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger`)
        return passengerProfile.fromJson(response.data)
    }


    async getFriends(): Promise<Friends[]> {
        const promise = axios.get(`${REST_SERVER_URL}/passenger/friends`)
        const response = await promise
        return (response.data)
    }

    async removeFriend(friendId: number) {
        const response = await axios.delete(`${REST_SERVER_URL}/passenger/friends`, 
            { params: { friendId: friendId }
        })
        return response
    }

    async addFriend( friendId: number) {
        const response = await axios.post(`${REST_SERVER_URL}/passenger/friends`, null, { 
            params: { friendId: friendId } })
        return response
    }

    async searchFriend(filterText: string) {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/friends/search`,
            { params: {filter: filterText } }
        )
        return response.data
    }

    async addBalance( money: number) {
        const response = await axios.put(`${REST_SERVER_URL}/passenger/addBalance`, null, { 
            params: {balance: money } })
        return response
    }

    async updateProfile(data: PassengerProfile)  {
        const response = await axios.put(`${REST_SERVER_URL}/passenger`, data)
        return response
    }

    async getSuggestions(): Promise<Friends[]> {
        const response = await axios.get(`${REST_SERVER_URL}/suggestion`)
        return response.data
    }

}

export const passengerService = new PassengerService();