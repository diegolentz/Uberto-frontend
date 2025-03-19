import { Avatar, Box, Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const CardFriends = ({ isFriend }: { isFriend: boolean }) => {
    return (
        <Box sx={{ width: '85%', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', border: '1.5px solid #a737fc', borderRadius: '1rem' , }}>
            <Box width={'20%'}>
                {/* img del amigo */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{border: '2px solid #430c8c'}} />
            </Box>
            <Box sx={{width:'60%', display: 'flex', flexDirection: 'row', gap: '0.5rem', justifyContent: 'flex-start', alignItems: 'center' }}>
                <h4 style={{ margin: 0}}>Diego</h4>
                <h4 style={{ margin: 0}}>Madaronda</h4>
            </Box>
            <Box width={'20%'}>
                {/* eliminar o agregar */}
                {isFriend ? (
                    <Button sx={{ color: 'red', borderColor: 'red', minWidth: '3rem', minHeight: '3rem', padding: '4px' }}>
                        <DeleteForeverIcon fontSize="medium"></DeleteForeverIcon>
                    </Button>
                ) :
                    <Button sx={{ color: 'green', borderColor: 'green', minWidth: '3rem', minHeight: '3rem', padding: '4px' }}>
                        <AddCircleIcon></AddCircleIcon>
                    </Button>
                }
            </Box>


        </Box>
    );
};