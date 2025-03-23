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

// export class SearchDrivers{
//     constructor(
//         public name: string,
//         public origin: string,
//         public destination: string,
//         public passengers: number,
//     ) {}
// }

export class FormDriver {
    public date: Date;
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
    public origin: string;
    public destination: string;
    public date: string; // Mantener la fecha como string
    public numberPassengers: number; // Cambiar el tipo a number

    constructor(data: FormDriver | FormPassenger) {
        this.origin = data.origin;
        this.destination = data.destination;

        // Convertir la fecha a formato 'YYYY-MM-DDTHH:mm' (sin la zona horaria)
        const dateObj = new Date(data.date); // Suponiendo que 'data.date' es un objeto Date
        this.date = dateObj.toISOString().split('T')[0] + 'T' + dateObj.toISOString().split('T')[1].slice(0, 5);

        // Convertir 'passengers' a número, en caso de que venga como string
        this.numberPassengers = Number(data.passengers); // O parseInt(data.passengers)

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

export const driverCard = new DriverCard(1, "Pedro Geraghty", "Volkswagen", "Transporter 2005", "AC 505 FT", 500, 5);
// export const searchDriver = new SearchDrivers("Usuario disponible", "Unsam", "Parque san martin", 4);
const formDriver = new FormDriver("Usuario disponible", "Unsam", "Parque San Martin", 4, new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
export const formEntity = new FormEntity(formDriver);
export const driverProfile = new DriverProfile("Pedro", "Geraghty", 160.0, "AB586CD", "Toyota", 2022);