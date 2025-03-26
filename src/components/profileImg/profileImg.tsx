import { Height } from "@mui/icons-material"
import { Box } from "@mui/material"
import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";

export const ProfileImg = () => {
  const id = parseInt(sessionStorage.getItem('userId')!);
  const isDriver = sessionStorage.getItem('role')?.toLowerCase() === 'driver';
  const [myImg, setImg] = useState<string>("")

  const getImage = async () => {
    var img = ""
    if (isDriver) {
      img = await driverService.getImg(id) 
    } else {
      img = await passengerService.getImg(id) 
    }
    console.log("img", img)
    setImg(img)
  }

  useEffect(() => {
    getImage()

  }, [])

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const SmallAvatar = {
    width: '6rem',
    height: '6rem',
    border: `2px solid purple`,
  };

  return (
    <Box sx={{ height: '8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={myImg} sx={SmallAvatar} />
        </StyledBadge>
      </Stack>
    </Box>
  )


}









