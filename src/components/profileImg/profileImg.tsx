import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";
import { SmallAvatar, StyledBadge } from "../../utils/profileStyles";

export const ProfileImg = () => {
  const isDriver = localStorage.getItem('isDriver') === 'true';
  const [myImg, setImg] = useState<string>("")

  const getImage = async () => {
    const img = isDriver 
      ? await driverService.getImg() 
      : await passengerService.getImg();
    setImg(img);
  }

  useEffect(() => {
    getImage()
  }, [])

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









