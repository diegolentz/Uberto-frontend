import axios from "axios";
import { REST_SERVER_URL } from "./urls";



class LoginService {
    async tryLogin(requestBody: { username: string; password: string }): Promise<boolean> {
        try {
            // const data = await axios.get<Login>(REST_SERVER_URL).data
            const login = 1; /* cuando devuelva el id del back lo setea en el session momentaneamente con valor fijo */
            sessionStorage.setItem("idUser", login.toString());

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    }



    
}

export const loginService = new LoginService();