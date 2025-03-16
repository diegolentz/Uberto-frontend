import { Box, Button } from "@mui/material"
import * as styles from './confirmationStyles';
export const ButtonConfirmation = ({goTo} : {goTo : ()=>void}) => {
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