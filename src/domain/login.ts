
export type loginRequest = {
    username:string;
    password:string;
}

export type loginResponse = {
    id:number;
    rol:string;
    token:string;
}