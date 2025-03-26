
export class TravelCard {
    constructor(
        public duration: number,
        public numberPasaenger: number,
        public date: Date,
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string,
        public id: number
    ){}

    fromDTO(data: TravelDTO): TravelCard {
        return new TravelCard(
            this.duration = data.duration,
            this.numberPasaenger = data.numberPassengers,
            this.date = data.date,
            this.origin = data.origin,
            this.destination = data.destination,
            this.price = data.price,
            this.driverName = data.driverName,
            this.passengerName = data.passengerName,
            this.id = data.id
        )
    }
}

export class TravelDTO {
    constructor(
        public userId: number,
        public driverId: number,
        public duration: number, // duración en minutos
        public numberPassengers: number,
        public date: Date , // Aceptar tanto Date como string
        public origin: string,
        public destination: string,
        public price: number,
        public driverName: string,
        public passengerName: string,
        public startTime: string,
        public endTime: string,
        public id: number
    ){}

    // Método para extraer la hora de la fecha y asignarla a startTime
    setStartTime(): void {
        // Asegurarse de que 'date' sea un objeto Date
        const dateObj = new Date(this.date);
        
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        this.startTime = `${hours}:${minutes}`;
    }

    // Método para sumar la duración al startTime y asignarlo a endTime
    setEndTime(): void {
        // Asegurarse de que 'date' sea un objeto Date
        const startDate = new Date(this.date);
        startDate.setMinutes(startDate.getMinutes() + this.duration); // Sumar la duración en minutos
        
        const hours = startDate.getHours().toString().padStart(2, '0');
        const minutes = startDate.getMinutes().toString().padStart(2, '0');
        this.endTime = `${hours}:${minutes}`;
    }
}