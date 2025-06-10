import { useContext, useEffect, useState } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Button, Divider, TextField } from "@mui/material";
import { CardFriends } from '../cards/cardFriends';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Friends } from '../../domain/passenger';
import { passengerService } from '../../services/passenger.service';
import { msjContext } from '../viewLayout/viewLayout';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from "framer-motion";

export const FriendsComponent = () => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>(""); 
    const [notFriends, setNotFriends] = useState<Friends[]>();
    const [friends, setFriends] = useState<Friends[]>([]);
    const { showToast } = useContext(msjContext)

    const changeVisibility = async () =>   {
        setVisibility(!visibility);
        const amigetes = await passengerService.getSuggestions()
        setNotFriends(amigetes);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const fetchFriend = async () => {
        try{
            const notFriends = await passengerService.searchFriend(searchText);
            setNotFriends(notFriends);
        }catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        }
    };

    const fetchFriends = async () => {
        const currentFriends = await passengerService.getFriends();
        setFriends(currentFriends);
    }

    const removeNotFriend = (friendId: number) => {
        setNotFriends(prevNotFriends => prevNotFriends?.filter(friend => friend.id !== friendId));
        fetchFriends();
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
            <AnimatePresence>
                {visibility && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }} // Transición de altura controlada
                        exit={{ opacity: 0, height: 0 }} // Cuando se cierra, la altura se reduce a 0
                        transition={{
                            duration: 0.5,
                            // type: "spring",
                        }}
                        style={{ overflow: "hidden" }} 
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "3rem" }}>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search people"
                                    sx={searchStyles}
                                    value={searchText}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    onClick={fetchFriend}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ height: "100%", width: "20%", borderRadius: "0 0.5rem 0.5rem 0" }}
                                    >
                                    <ZoomInIcon />
                                </Button>


                            </Box>
    
                            <h5>Results</h5>
                            {notFriends?.map((friend, index) => (
                                <motion.div
                                key={friend.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <CardFriends isFriend={false} friendData={friend} func={() => removeNotFriend(friend.id)} />
                                </motion.div>
                            ))}
                            <Divider sx={{ borderColor: "#a737fc", width: "100%" }} />
                        </Box>
                </motion.div>
                )}
            </AnimatePresence>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <h5>My friends</h5>
                {friends.map((friend, index) => (
                    <CardFriends key={index} isFriend={true} friendData={friend} func={fetchFriends} />
                ))}
            </Box>
        </Box>
    );
};
