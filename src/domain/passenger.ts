export class FormPassenger {
    public duration: number = 30;
    constructor(
        public origin: string,
        public destination: string,
        public date: Date,
        public passengers: number,
    ) {}
}