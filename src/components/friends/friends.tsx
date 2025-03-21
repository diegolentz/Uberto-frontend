import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Button, Divider, TextField } from "@mui/material";
import { CardFriends } from './cardFriends';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Friends } from '../../domain/passenger';

export const FriendsComponent = ({ friends }: { friends: Friends[] }) => {

    const [visibility, setVisibility] = useState<boolean>(false)

    const changeVisibility = () => {
        setVisibility(!visibility)
    }

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

    }

    return (
        <>
            <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                    <h3>Friends</h3>
                    <Button variant="outlined" color='secondary' onClick={changeVisibility}>
                        {visibility ?
                            <ExpandLessIcon></ExpandLessIcon>
                            :
                            <ExpandMoreIcon></ExpandMoreIcon>

                        }
                    </Button>
                </Box>
                {visibility && (
                    <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '3rem' }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search pipol"
                                sx={searchStyles}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    height: '100%',
                                    width: '20%',
                                    borderRadius: '0 0.5rem 0.5rem 0' // Esquinas derechas a 90 grados
                                }}
                            >
                                <ZoomInIcon></ZoomInIcon>
                            </Button>
                        </Box>

                        <h5>Results</h5>
                        {friends.map((friend, index) => (
                            <CardFriends key={index} isFriend={false}></CardFriends>
                        ))}

                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc', width: '100%' }} />




                    </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>

                    <h5>My friends</h5>
                    {friends.map((friend, index) => (
                        <CardFriends key={index} isFriend={true}></CardFriends>
                    ))}
                </Box>
            </Box>

        </>
    );


}