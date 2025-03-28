import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { loginRequest, loginResponse } from "../domain/login";

export async function tryLogin(loginRequest: loginRequest): Promise<void> {
    const promise = axios.post<loginResponse>(REST_SERVER_URL + '/login', loginRequest);
    const response = await promise;
    sessionStorage.setItem("userId", response.data.id.toString());
    sessionStorage.setItem("isDriver", (response.data.rol === "driver").toString());
}
