
export class TravelCard {
    constructor(
        public duration: number,
        public numberPasaenger: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string
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
        )
    }
}

export class TravelDTO {
    constructor(
        public userId: number,
        public driverId: number,
        public duration: number,
        public numberPassengers: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string
    ){
        
    }
}

