import { driverProfile, DriverProfile, FormEntity } from "../domain/driver";
import { pastTravel, pendingTravel, TravelCard } from "../domain/travel";

class DriverService {
    getFinishtrips(id: number) : Promise<TravelCard[]> {
        // implementar endpoint para obtener viajes finalizados
        return Promise.resolve([pastTravel]);
    }

  
    
    
    getImg(id: number, isDriver: boolean):Promise<string> {
        
     return Promise.resolve("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE");
    }

    getProfile(id: number): Promise<DriverProfile> {
        return Promise.resolve(driverProfile);
    }

    getPendingTravels(info : FormEntity) : Promise<TravelCard[]> {
        // implementar endpoint para obtener viajes pendientes
        // este metodo se usa para llevarle al back destino y origen, fecha y que busque quiernes estan disponibles
        return Promise.resolve([pastTravel]);
    }

    getProfilePendingTravels(id: number) : Promise<TravelCard[]> {
        // implementar endpoint para obtener viajes pendientes
        return Promise.resolve([pendingTravel]);
    }
}

export const driverService = new DriverService();