import { FormPassenger } from "./passenger";

export class DriverCard {
    constructor(
        public id: number,
        public name: string,
        public brand: string,
        public model: string,
        public serial: string,
        public price: number,
        public rating: number,
        public img: string
    ) {}
}

export class FormDriver {
    public date: Date;
    public duration:number = 0
    constructor(
        public name: string,
        public origin: string,
        public destination: string,
        public passengers: number,
        date?: Date
    ) {
        
        this.date = date || new Date(); // Default to the current date if not provided
    }
}

export class FormEntity {
    public userId: number
    public origin: string;
    public destination: string;
    public date: Date; 
    public numberPassengers: number; 
    
    constructor(data: FormDriver | FormPassenger) {
        this.userId = 0
        this.origin = data.origin;
        this.destination = data.destination;
        this.date = data.date
        this.numberPassengers = data.passengers

    }
}


export class DriverProfile {
    constructor(
        public name: string,
        public lastname: string,
        public price: number, // Updated to support decimals
        public domain: string,
        public brand: string,
        public model: number,
    ){}
}

// export const searchDriver = new SearchDrivers("Usuario disponible", "Unsam", "Parque san martin", 4);
const formDriver = new FormDriver("Usuario disponible", "Unsam", "Parque San Martin", 4, new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
export const formEntity = new FormEntity(formDriver);
export const driverProfile = new DriverProfile("Pedro", "Geraghty", 160.0, "AB586CD", "Toyota", 2022);