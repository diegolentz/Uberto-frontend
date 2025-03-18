export class DriverProfile {
    constructor(
        public name: string,
        public lastname: string,
        public price: number, // Updated to support decimals
        public domain: string,
        public brand: string,
        public model: number,
    ){}
}

export const driverProfileMock = new DriverProfile("Pedro", "Geraghty", 160.0, "AB586CD", "Toyota", 2022)

export class UserProfile {
    constructor(
        public name: string,
        public lastname: string,
        public phone: number,
        public money: number
    ){}
}

export const userProfileMock = new UserProfile("Manuel", "Gonzalez", 1559335519, 1000.0)

