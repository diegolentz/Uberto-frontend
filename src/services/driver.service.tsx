import { FormEntity } from "../domain/driver";
import { pendingTravel, TravelCard } from "../domain/travel";

class DriverService {
    getPendingTravels(data: FormEntity) : Promise<TravelCard[]> {
        // implementar endpoint para obtener viajes pendientes
        return Promise.resolve([pendingTravel]);
    }
}

export const driverService = new DriverService();