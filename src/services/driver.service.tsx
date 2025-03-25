import axios from "axios";
import {  DriverProfile, FormEntity } from "../domain/driver";
import { Recommendation, } from "../domain/recomendation";
import { TravelCard, TravelDTO } from "../domain/travel";
import { REST_SERVER_URL } from "./urls";

class DriverService {
   
   
   async getProfile(id: number) : Promise<DriverProfile> {
        const response = await axios.get(`${REST_SERVER_URL}/driver`, { params: { id: id } })
        return response.data
    }
    // profileRatings(id: number) : Promise<Recommendation[]> {
    //     // implementar endpoint para obtener recomendaciones
    //     return Promise.resolve([recommendation1,recommendation2]);
    // }

    
    getImg(id: number, isDriver: boolean):Promise<string> {
        
     return Promise.resolve("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE");
    }

    async getPendingTravels(data: FormEntity): Promise<TravelCard[]> { 
        const response = await axios.post(`${REST_SERVER_URL}/trip/pending`, data);
        const travels = response.data.map((item: TravelDTO) => TravelCard.prototype.fromDTO(item));
        return travels;
    }


    // getRatings(idUser: number) : Promise<Recommendation[]> {
    //     const recom = [recommendation1,recommendation2]
    //     return  Promise.resolve(recom);
    // }
}

export const driverService = new DriverService();