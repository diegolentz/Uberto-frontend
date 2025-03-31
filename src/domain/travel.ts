
export class TravelCard {
    constructor(
        public duration: number,
        public numberPasaenger: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string,
        public id: number,
        public imgPassenger: string,
        public imgDriver: string,
        public scored: boolean
    ){}

    fromDTO(data: TravelDTO): TravelCard {
        return new TravelCard(
            this.duration = data.duration,
            this.numberPasaenger = data.numberPassengers,
            this.date = data.date,
            this.origin = data.origin,
            this.destination = data.destination,
            this.price = data.price,
            this.driverName = data.driverName,
            this.passengerName = data.passengerName,
            this.id = data.id,
            this.imgPassenger = data.imgPassenger,
            this.imgDriver = data.imgDriver,
            this.scored = data.scored
        )
    }
}

export class TravelDTO {
    constructor(
        public userId: number,
        public driverId: number,
        public duration: number, // duración en minutos
        public numberPassengers: number,
        public date: Date , // Aceptar tanto Date como string
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string,
        public startTime: string,
        public endTime: string,
        public id: number,
        public imgPassenger : string,
        public imgDriver : string,
        public scored: boolean
    ){}
}

export class CreateTravelDTO {
    constructor(
        public userId: number,
        public driverId: number,
        public duration: number, 
        public numberPassengers: number,
        public date: Date , 
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string,
        public startTime: string,
        public endTime: string,){}    
}