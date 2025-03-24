
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
    ){
        
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

