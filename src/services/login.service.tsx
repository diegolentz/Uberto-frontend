import axios from "axios";
import { REST_SERVER_URL } from "./urls";
import { loginRequest, loginResponse } from "../domain/login";

export async function tryLogin(loginRequest: loginRequest) {
    const promise = axios.post<loginResponse>(REST_SERVER_URL + '/login', loginRequest)
    const response = await promise
    sessionStorage.setItem("userId", response.data.id.toString());
    sessionStorage.setItem("role", response.data.rol.toString());
}


// type HttpError = {
//     errorMessage:string;
//     errorStatus:number;
// }
// export async function tryLogin(loginRequest: loginRequest): Promise<void | HttpError> {
//     return axios.post<loginResponse>(REST_SERVER_URL + '/login', loginRequest)
//         .then(function (response) {
//             sessionStorage.setItem("userId", response.data.id.toString());
//             sessionStorage.setItem("role", response.data.rol.toString());
//         })
//         .catch(function (error) {
//             if (error.response) {
//                 console.error("Login failed:", error.response.data.message);
//                 console.error("Login failed:", error.response.status);
//                 return {
//                     errorMessage:error.response.data.message,
//                     errorStatus:error.response.status
//                 }
//                 // throw new Error(error.response.data.message)
//             }else{
//                 throw new Error("Unexpected error")
//             }
//         });
// }