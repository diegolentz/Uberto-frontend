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
    isEdit: boolean;
    editMode: boolean;

    constructor(
        id : number,
        name: string,
        date: Date,
        scorePoints: number,
        message: string,
        passengerName: number,
        driverName: string,
        isEdit: boolean,
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
        this.isEdit = isEdit;
        this.editMode = editMode;
    }
}
