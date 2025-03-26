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
        public serial: string,
        public firstName: string,
        public lastName: string,
        public brand: string,
        public model: number,
        public price: number, 
    ){}
    fromJson(data: any): DriverProfile  {
        this.id = data.id
        this.serial = data.serial
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.brand = data.brand
        this.model = data.model
        this.price = data.price

        return Object.assign(
            new DriverProfile(this.id, this.serial, this.firstName,
                this.lastName, this.brand, this.model, this.price),
            this
        );
    }
}

// export const searchDriver = new SearchDrivers("Usuario disponible", "Unsam", "Parque san martin", 4);
// const formDriver = new FormDriver("Usuario disponible", "Unsam", "Parque San Martin", 4, new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
// export const formEntity = new FormEntity(formDriver);
export const driverProfile = new DriverProfile(1, "Pedro", "Geraghty", "Toyota", 2022, 160.0, "AB586CD");