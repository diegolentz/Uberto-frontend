import axios from "axios";
import { REST_SERVER_URL } from "./urls";

import { Login } from "../domain/login";



export async function tryLogin(requestBody: { username: string; password: string }): Promise<boolean> {
    try {
        // const data = await axios.get<Login>(REST_SERVER_URL).data
        sessionStorage.setItem("idUser", Login.idUser.toString()); 
        sessionStorage.setItem("idDriver", Login.idDriver.toString()); 
        sessionStorage.setItem("img", Login.img); 

        return true; 
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
}
