import { driverCard, DriverCard, FormEntity } from "../domain/driver";

class PassengerService {


    getAvailableDrivers(data: FormEntity) : Promise<DriverCard[]> {
        // implementar endpoint para obtener conductores disponibles
        return Promise.resolve([driverCard]);


    }
}

export const passengerService = new PassengerService();