
export class TravelCard {
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

// export class SearchTravels{
//     public duration: number = 0;
//     constructor(
//         public orign: string,
//         public destination: string,
//         public init: Date,
//         public passengers: number,

//     ) {}
// }



export const pendingTravel = new TravelCard(
    "Adrian",
    "Perez",
    "Av San Martin 1500",
    "Plaza San Martin",
    3,
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days after today
    60,
    500
);

export const pastTravel = new TravelCard(
    "Lucia",
    "Gomez",
    "Calle 123",
    "Parque Central",
    2,
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days before today
    45,
    300
);

// export const futureTravel = new SearchTravels(
//     "Av Siempre Viva 742", // Example origin
//     "Plaza Principal", // Example destination
//     new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days after today
//     4 // Example number of passengers
// );
