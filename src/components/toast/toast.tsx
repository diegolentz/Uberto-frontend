import { Alert, AlertTitle } from "@mui/material";
import { AxiosResponse } from "axios";

export default function Toast({res} : {res:AxiosResponse}){
    //severity = success, error, warnings
    const message = res.status >= 200 && res.status < 300 ? res.data : res.data.message

    const setStatus = ()  => {
        if(res.status >= 200 && res.status <=299){
            return "success"
        }
        return "error"
    }
    
    return(
        <>
            { res.data && 
                <Alert  variant="filled" severity={setStatus()} sx={{position:"fixed", width:"auto",height:'auto', right:"0",top:"0rem",zIndex:"10"}} data-testid="alert">
                        <AlertTitle>{message}</AlertTitle>
                </Alert>
            }
        </>
    )
}