import axios from "axios";
import { DriverCard, FormEntity } from "../domain/driver";
import { Friends, friendsJSON, passengerProfile, PassengerProfile } from "../domain/passenger";
import { Recommendation, recommendation1, recommendation2 } from "../domain/recomendation";
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


    getImg(id: number, isDriver: boolean): Promise<string> {
        // solo devuelvo una imagen de ejemplo
        return Promise.resolve("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE");
    }


    async getAvailableDrivers(data: FormEntity) {
        const response = await axios.post(`${REST_SERVER_URL}/driver/avaliable`, data)
        return response.data
    }


    async getProfile(id: number): Promise<PassengerProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger`, { params: { id: id } })
        return passengerProfile.fromJson(response.data)
    }


    async getFriends(id: number): Promise<Friends[]> {
        const response = await axios.get(`${REST_SERVER_URL}/passenger/friends`, { params: { id: id } })
        return friendsJSON.fromJson(response.data)
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
        const response = await axios.get(`${REST_SERVER_URL}/passenger/friends/search`, { params: { id: id, filter: filterText } })
        return response.data
    }

    async addBalance(id: number, money: number) {
        const response = await axios.put(`${REST_SERVER_URL}/passenger/addBalance`, null, { params: { id: id, balance: money } })
        return response
    }

    async updateProfile(id: number, data: any) {
        const response = await axios.put(`${REST_SERVER_URL}/passenger`, data, { params: { id: id } })
        return response
    }

}

export const passengerService = new PassengerService();