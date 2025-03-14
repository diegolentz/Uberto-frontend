export class Driver {
    constructor(
        public name: string,
        public brand: string,
        public model: string,
        public patent: string,
        public price: number
    ){}
}

export class Travel {
    constructor(
        public name: string,
        public lastName: string,
        public pasaenger: number,
        public origin: string,
        public destination: string,
        public date: Date,
        public hour: Date,
        public duration: Date,
        public price: number,
    ){
        
    }
}


export const driverMock = new Driver("Pedro Geraghty" , "Volkswagen" , "Transporter 2005" , "AC 505 FT" ,500)
export const travelMock = new Travel("Roberto","Diaz",3,"Av san martin 1500","Plaza San Martin",new Date(),new Date(),new Date(),500)