import { Box, Button } from "@mui/material"
import * as styles from './confirmationStyles';
import { useNavigate } from "react-router-dom";
export const ButtonConfirmation = () => {

    const navigate = useNavigate()

    const goTo = () =>{
        navigate("/home")
    }
    return(<>
        <Box 
            sx = {styles.boxButtons}
            >
            <Button 
                variant="outlined"
                color="secondary"
                onClick={goTo}
            >
                decline
            </Button>
            <Button 
                variant="contained"
                color="secondary"
            >
                Confirm
            </Button>
        </Box>
    </>)
}