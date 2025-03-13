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
export const travelMock = new Travel("Colo","Diaz",3,"Unsam Gral San Martin","Puerto de frutos",new Date(),new Date(),new Date(),500)