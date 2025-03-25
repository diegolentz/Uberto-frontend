export class Recommendation {
    id : number;
    name: string;
    date: Date;
    scorePoints: number;
    message: string;
    avatarUrlDriver: string;
    passengerName: number;
    driverName: string;
    avatarUrlPassenger: string;
    delete: boolean;
    editMode: boolean;

    constructor(
        id : number,
        name: string,
        date: Date,
        scorePoints: number,
        message: string,
        passengerName: number,
        driverName: string,
        isEdit: boolean, //me rompe cuando cambia este valor no se que onda
        editMode: boolean,
        avatarUrlPassenger: string,
        avatarUrlDriver: string
    ) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scorePoints = scorePoints;
        this.message = message;
        this.avatarUrlDriver = avatarUrlDriver;
        this.passengerName = passengerName;
        this.driverName = driverName;
        this.avatarUrlPassenger = avatarUrlPassenger;
        this.delete = isEdit;
        this.editMode = editMode;
    }
}
