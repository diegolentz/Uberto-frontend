import axios from "axios";
import { FormEntity } from "../domain/driver";
import { Friends, friendsJSON, passengerProfile, PassengerProfile } from "../domain/passenger";
import { Recommendation } from "../domain/recomendation";
import { REST_SERVER_URL } from "./urls";

class PassengerService {
    deleteRecom(idreco: number, idUser: number) {
        // eliminar la recom de usuario, solo se eliminan las que crea el usuario
    }
    async profileRatings(userId: number): Promise<Recommendation[]> {
        const res = await axios.get(`${REST_SERVER_URL}/TripScore`, {
            params: { userId: userId }
        });
        console.log(res);

        return res.data;
    }


    async getImg(id: number): Promise<string> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/img`, {
            params: { passengerId: id }
        });
        return response.data.img;
    }


    async getAvailableDrivers(data: FormEntity) {
        const response = await axios.get(`${REST_SERVER_URL}/driver/avaliable`, {
            params: { 
                date: data.date,
                origin: data.origin,
                destination: data.destination,
                numberpassengers: data.numberPassengers
            }
        });
        
        return response.data;
    }


    async getProfile(id: number): Promise<PassengerProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/${id}`)
        return passengerProfile.fromJson(response.data)
    }


    async getFriends(id: number): Promise<Friends[]> {
        const promise = axios.get(`${REST_SERVER_URL}/passenger/${id}/friends`)
        const response = await promise
        return (response.data)
    }

    async removeFriend(id: number, friendId: number) {
        const response = await axios.delete(`${REST_SERVER_URL}/passenger/friends`, { params: { passengerId: id, friendId: friendId } })
        return response
    }

    async addFriend(id: number, friendId: number) {
        const response = await axios.post(`${REST_SERVER_URL}/passenger/friends`, null, { params: { passengerId: id, friendId: friendId } })
        return response
    }

    async searchFriend(id: number, filterText: string) {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/${id}/friends/search`,
            { params: {filter: filterText } }
        )
        return response.data
    }

    async addBalance(id: number, money: number) {
        const response = await axios.put(`${REST_SERVER_URL}/passenger/addBalance`, null, { params: { id: id, balance: money } })
        return response
    }

    async updateProfile(data: PassengerProfile)  {
        const id = parseInt(sessionStorage.getItem('userId')!)
        console.log("datos que se mandan al back" , data)
        const response = await axios.put(`${REST_SERVER_URL}/passenger`, data, { params: { id: id } })
        return response
    }

}

export const passengerService = new PassengerService();