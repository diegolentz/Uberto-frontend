import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { loginRequest, loginResponse } from "../domain/login";

export async function tryLogin(loginRequest: loginRequest): Promise<void> {
    const promise = axios.post<loginResponse>(REST_SERVER_URL + '/login', loginRequest);
    const response = await promise;
    localStorage.setItem("isDriver", (response.data.rol.toLowerCase() === "driver").toString());
    localStorage.setItem("token", response.data.token.toString());
}
