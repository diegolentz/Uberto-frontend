export class Driver {
    constructor(
        public name: string,
        public brand: string,
        public model: string,
        public patent: string,
        public price: number
    ){}
}

export const driverMock = new Driver("Pedro Geraghty" , "Volkswagen" , "Transporter 2005" , "AC 505 FT" ,500)