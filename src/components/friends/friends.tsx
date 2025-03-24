import { useContext, useEffect, useState } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Button, Divider, TextField } from "@mui/material";
import { CardFriends } from './cardFriends';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Friends } from '../../domain/passenger';
import { passengerService } from '../../services/passenger.service';
import { msjContext } from '../viewLayout/viewLayout';
import { AxiosError } from 'axios';

export const FriendsComponent = ({ id }: { id: number }) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>(""); // Estado para almacenar el texto del input
    const [notFriends, setNotFriends] = useState<Friends[]>(); // Estado para almacenar el texto del input
    const [friends, setFriends] = useState<Friends[]>([]);
    const { showToast } = useContext(msjContext)

    const changeVisibility = () => {
        setVisibility(!visibility);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value); // obtengo el valor del input, habria que mejorarlo
    };

    const fetchFriend = async () => {
        const nFriends = await passengerService.getFriends(id);
        setNotFriends(nFriends);
    };

    const fetchFriends = async () => {
        const nFriends = await passengerService.getFriends(id);
        setFriends(nFriends);
    }

    useEffect(() => {
        try {
            fetchFriends();
        }
        catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    }, []);




    const searchStyles = {
        height: '100%',
        width: '80%',
        '& .MuiOutlinedInput-root': {
            height: '100%',
            padding: '0 0.5rem',
            borderRadius: '0.5rem 0 0 0.5rem',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a737fc',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a737fc',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a737fc',
        },
    };

    return (
        <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                <h3>Friends</h3>
                <Button variant="outlined" color='secondary' onClick={changeVisibility}>
                    {visibility ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
            </Box>
            {visibility && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '3rem' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search pipol"
                            sx={searchStyles}
                            value={searchText} // Controla el valor del input
                            onChange={handleInputChange} // Maneja el cambio de texto
                        />
                        <Button onClick={fetchFriend} variant="contained" color="secondary" sx={{
                            height: '100%',
                            width: '20%',
                            borderRadius: '0 0.5rem 0.5rem 0'
                        }}>
                            <ZoomInIcon />
                        </Button>
                    </Box>

                    <h5>Results</h5>
                    {notFriends?.map((friend, index) => (
                        <CardFriends key={index} isFriend={false} friendData={friend} id={id} func={fetchFriends} />
                    ))}

                    <Divider sx={{ borderColor: '#a737fc', width: '100%' }} />
                </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <h5>My friends</h5>
                {friends.map((friend, index) => (
                    <CardFriends key={index} isFriend={true} friendData={friend} id={id} func={fetchFriends} />
                ))}
            </Box>
        </Box>
    );
};
