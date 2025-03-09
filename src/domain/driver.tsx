export class Driver {
    constructor(
        public name: string,
        public brand: string,
        public model: string,
        public patent: string,
        public price: number
    ){}
}

export const driverMock = new Driver("Pedro" , "Volkswagen" , "Transporter 2005" , "ACG 505" ,500) 