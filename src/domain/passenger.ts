export class FormPassenger {
    public duration: number = 30;
    constructor(
        public origin: string,
        public destination: string,
        public date: Date,
        public passengers: number,
    ) {}
}

export class Friends {
    constructor(
        public name: string,
        public lastname: string,
        public img: string
    ){}
}

export class PassengerProfile {
    constructor(
        public name: string,
        public lastname: string,
        public phone: number,
        public money: number,
        public friends: Friends[]
    ){}
}

export const friend1 = new Friends("Pedro", "Geraghty", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE")
export const friend2 = new Friends("Pedro", "Geraghty", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a7586b-3d38-4293-9d13-75e10782ff57/dgvmqk1-dad75537-dd19-4e33-9a02-ba5db2e8670a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYTc1ODZiLTNkMzgtNDI5My05ZDEzLTc1ZTEwNzgyZmY1N1wvZGd2bXFrMS1kYWQ3NTUzNy1kZDE5LTRlMzMtOWEwMi1iYTVkYjJlODY3MGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7i3pTmvPWdSQVrhrvARF9Cr4-WB5k-uhAOo44u6dSZE")
const friends = [friend1, friend2]

export const passengerProfile = new PassengerProfile("Manuel", "Gonzalez", 1559335519, 1000.0, friends);


