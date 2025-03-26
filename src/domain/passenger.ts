export class FormPassenger {
    public duration:number = 0
    constructor( 
        public origin: string,
        public destination: string,
        public date: Date,
        public passengers: number,

    ) { }
}

export class Friends {
    constructor(
        public firstname: string = '',
        public lastname: string = '',
        public img: string = '',
        public id: number = 0
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromJson(json: any): Friends[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return json.map((friend: any) => {
            this.firstname = friend.firstname
            this.lastname = friend.lastname
            this.img = friend.img
            this.id = friend.id

            return Object.assign(new Friends(), this);
        })
    }
}

    export const friendsJSON = new Friends()

export class PassengerProfile {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public phone: number = 0,
        public money: number = 0,
    ) { }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromJson(json: any): PassengerProfile {
        this.firstName = json.firstname
        this.lastName = json.lastname
        this.phone = json.cellphone
        this.money = json.money

        return Object.assign(new PassengerProfile(), this);
    }
}

export const passengerProfile = new PassengerProfile();

export const friend1 = new Friends("Pedro", "Geraghty", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE")
export const friend2 = new Friends("Pedro", "Geraghty", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE")
export const friends = [friend1, friend2]

//export const passengerProfile = new PassengerProfile("Manuel", "Gonzalez", 1559335519, 1000.0, friends, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.outsideonline.com%2Fculture%2Factive-families%2Fhow-to-read-dog-body-language-happy-aggressive%2F&psig=AOvVaw24pdWZOtK4FEyLUUAqUrl0&ust=1742826835140000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJCI_4S2oIwDFQAAAAAdAAAAABAE');


