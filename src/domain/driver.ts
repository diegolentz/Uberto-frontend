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
        public img: string,
        public type: string,
        public recom : number
    ) {}
}

export class FormDriver {
    public duration:number = 0
    constructor(
        public name: string,
        public origin: string,
        public destination: string,
        public passengers: number,
    ) {}
}

export class FormEntity {
    public userId: number
    public origin: string;
    public destination: string;
    public date: Date; 
    public numberPassengers: number; 
    public name: string;
    
    constructor(data: FormDriver | FormPassenger) {
        this.userId = 0
        this.origin = data.origin;
        this.destination = data.destination;
        this.date = (data instanceof FormPassenger) ? data.date : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        this.name = (data instanceof FormDriver) ? data.name : '';
        this.numberPassengers = data.passengers

    }
}




export class DriverProfile {
    constructor(
        public id : number,
        public firstname: string,
        public lastname: string,
        public brand: string,
        public model: number,
        public price: number, // Updated to support decimals
        public domain: string,
    ){}
    fromJson(data: any): DriverProfile  {
        this.id = data.id
        this.firstname = data.firstName
        this.lastname = data.lastName
        this.price = data.price
        this.domain = data.serial
        this.brand = data.brand
        this.model = data.model

        return Object.assign(
            new DriverProfile(this.id, this.firstname, this.lastname, this.brand, this.model, this.price, this.domain),
            this
        );
    }
}

// export const searchDriver = new SearchDrivers("Usuario disponible", "Unsam", "Parque san martin", 4);
// const formDriver = new FormDriver("Usuario disponible", "Unsam", "Parque San Martin", 4, new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
// export const formEntity = new FormEntity(formDriver);
export const driverProfile = new DriverProfile(1, "Pedro", "Geraghty", "Toyota", 2022, 160.0, "AB586CD");