
export class Travel {
    constructor(
        public name: string,
        public lastName: string,
        public origin: string,
        public destination: string,
        public pasaenger: number,
        public date: Date,
        public duration: number,
        public price: number,
    ){
        
    }
}

export const travelMock = new Travel("Adrian","Perez","Av san martin 1500","Plaza San Martin",3,new Date(),60,500)