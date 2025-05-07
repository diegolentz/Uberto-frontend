import { Avatar, Box, Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Friends } from "../../domain/passenger";
import { passengerService } from "../../services/passenger.service";
import { useContext } from "react";
import { msjContext } from "../viewLayout/viewLayout";
import { AxiosError } from "axios";

export const CardFriends = ({ isFriend, friendData, func }: { isFriend: boolean, friendData: Friends, func: (id?: number) => void }) => {

    const { showToast } = useContext(msjContext)

    const removeFriend = async (friendId: number) => {
        try {
            const response = await passengerService.removeFriend(friendId);
            func();
            showToast(response);
        }
        catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    const addFriend = async (friendId: number) => {
        try {
            const response = await passengerService.addFriend(friendId);
            func(friendId);
            showToast(response);
        }
        catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }

    return (
        <Box sx={{ width: '18rem', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', border: '1.5px solid #a737fc', borderRadius: '1rem', }}>
            <Box width={'20%'}>
                <Avatar alt="Remy Sharp" src={friendData.img} sx={{ border: '2px solid #430c8c' }} />
            </Box>
            <Box sx={{ width: '60%', display: 'flex', flexDirection: 'row', gap: '0.5rem', justifyContent: 'flex-start', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}>{friendData.firstname}</h4>
                <h4 style={{ margin: 0 }}>{friendData.lastname}</h4>
            </Box>
            <Box width={'20%'}>
                {/* eliminar o agregar */}
                {isFriend ? (
                    <Button sx={{ color: 'red', borderColor: 'red', minWidth: '3rem', minHeight: '3rem', padding: '4px' }} onClick={() => { removeFriend(friendData.id) }}>
                        <DeleteForeverIcon fontSize="medium"></DeleteForeverIcon>
                    </Button>
                ) :
                    <Button sx={{ color: 'green', borderColor: 'green', minWidth: '3rem', minHeight: '3rem', padding: '4px' }} onClick={() => { addFriend(friendData.id) }}>
                        <AddCircleIcon></AddCircleIcon>
                    </Button>
                }
            </Box>


        </Box>
    );
};