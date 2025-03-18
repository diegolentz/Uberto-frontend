export class DriverProfile {
    constructor(
        public name: string,
        public lastname: string,
        public price: number,
    ){}
}

export const driverProfileMock = new DriverProfile("Pedro" , " Geraghty" , 160.2)

export class UserProfile {
    constructor(
        public name: string,
        public lastname: string,
        public phone: number
    ){}
}

export const userProfileMock = new UserProfile("Manuel" , "Gonzalez" ,1559335519)

export class ProfileGenericMock {
    constructor(
        public name: string,
        public lastname: string,
        public price: number,
        public phone: number,
        public patent: string,
        public brand: string,
        public model: number,
        public money: number 

    ){}
}

export const profileGenericMock = new ProfileGenericMock("Pedro" , " Geraghty" , 160.2, 1559335519, "ABC123", "Ford", 2021,1500.0)

