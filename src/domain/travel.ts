
export class TravelCard {
    constructor(
        public id: number,
        public entityId : string,
        public name: string,
        public duration: number,
        public numberPasaenger: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public imgAvatar: string,
        public price: number,
        public scored: boolean

        
    ){}

    fromDTO(data: TravelDTO): TravelCard {
        return new TravelCard(
            this.id = data.id,
            this.entityId = data.entityId,
            this.name = data.name,
            this.duration = data.duration,
            this.numberPasaenger = data.numberPasaenger,
            this.date = data.date,
            this.origin = data.origin,
            this.destination = data.destination,
            this.imgAvatar = data.imgAvatar,
            this.price = data.price,
            this.scored = data.scored
        )
    }
}

export class TravelDTO {
    constructor(


        public id: number,
        public entityId : string,
        public name: string,
        public duration: number,
        public numberPasaenger: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public imgAvatar: string,
        public price: number,
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

export type PassengerTrips = {
    pending: TravelCard[],
    finished: TravelCard[]
}