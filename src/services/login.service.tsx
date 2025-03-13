import axios from "axios";
import { REST_SERVER_URL } from "./urls";


export async function tryLogin(loginRequest:{username:string, password:string}):Promise<{jwt:number}>{
    const response = await axios.post(`${REST_SERVER_URL}/login`, loginRequest);
    // localStorage.setItem("IdUser",this.loggedUserId.toString()) // Guarda el ID si es necesario
    console.log(response.data)
    return response.data
}

