import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import PortraitIcon from '@mui/icons-material/Portrait';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileNav = () => {

    
      const [value, setValue] = useState(0);
    
      const navigate = useNavigate();
    
    const navProfile = {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a737fc',
    };


      return (
        <Box >
          
          <BottomNavigation
            value={value}
            sx={navProfile}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Data"
              icon={<PortraitIcon />}
              onClick={() => navigate("/profile/data")}
              sx={{
                '& .MuiBottomNavigationAction-label': { color: 'white', fontWeight: 'bold' },
                color: 'black',
                '&.Mui-selected': { color: 'white' },
              }}
              />
            <BottomNavigationAction
              label="Trips"
              icon={<DepartureBoardIcon />}
              onClick={() => navigate("/profile/trips")}
              sx={{
                '& .MuiBottomNavigationAction-label': { color: 'white', fontWeight: 'bold' },
                color: 'black',
                '&.Mui-selected': { color: 'white' },
            }}
            />
            <BottomNavigationAction
              label="Ratings"
              icon={<StarHalfIcon />}
              onClick={() => navigate("/profile/ratings")}
              sx={{
                '& .MuiBottomNavigationAction-label': { color: 'white', fontWeight: 'bold' },
                color: 'black',
                '&.Mui-selected': { color: 'white' },
               }}
            />
          </BottomNavigation>
        </Box>
      );
    

}