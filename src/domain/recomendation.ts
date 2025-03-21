export class Recommendation {
    name: string;
    date: Date;
    rating: number;
    comment: string;
    avatarUrl: string;
    isEdit: boolean;
    editMode: boolean;

    constructor(
        name: string,
        date: Date,
        rating: number,
        comment: string,
        avatarUrl: string,
        isEdit: boolean,
        editMode: boolean
    ) {
        this.name = name;
        this.date = date;
        this.rating = rating;
        this.comment = comment;
        this.avatarUrl = avatarUrl;
        this.isEdit = isEdit;
        this.editMode = editMode;
    }
}

export const recommendation1 = new Recommendation(
    'Jose Luis',
    new Date(),
    5,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facere quae, quas deserunt voluptate neque magni amet asperiores assumenda, suscipit sint nam nisi totam et ab maiores. Soluta, numquam commodi.",
    "Foto",
    false,
    false
);
export const recommendation2 = new Recommendation(
    'Jose Luis',
    new Date(),
    5,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facere quae, quas deserunt voluptate neque magni amet asperiores assumenda, suscipit sint nam nisi totam et ab maiores. Soluta, numquam commodi.",
    "Foto",
    false,
    false
);