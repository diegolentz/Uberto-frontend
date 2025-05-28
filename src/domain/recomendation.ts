export class Recommendation {
    tripId: number;
    name: string;
    date: Date;
    scorePoints: number;
    message: string;
    avatarUrlImg: string;
    isDeleted: boolean;
    isEditMode: boolean;

    constructor(
        tripId: number,
        name: string,
        date: Date,
        scorePoints: number,
        message: string,
        avatarUrlImg: string,
        isDeleted: boolean,
        isEditMode: boolean
    ) {

    this.tripId = tripId;
    this.name = name;
    this.date = date;
    this.avatarUrlImg = avatarUrlImg;
    this.scorePoints = scorePoints;
    this.message = message;
    this.isDeleted = isDeleted;
    this.isEditMode = isEditMode;

}
}

export const recomendationEmpty = new Recommendation(
    0,
    '',
    new Date(),
    0,
    '',
    '',
    false,
    true
);

