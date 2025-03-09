import { Card, CardHeader, IconButton, Box, Divider, CardContent, Typography, CardMedia } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Driver, driverMock } from '../../domain/driver';
import { useState } from 'react';

export const CardDriver = () => {
  const [driver, setDriver] = useState<Driver>(driverMock);

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            backgroundColor: '#430c8c',
            padding: '16px',
            color: '#ffffff',
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ color:'white', fontSize: 'inherit' }} />
              </IconButton>
              <Typography sx={{ color: 'white', fontSize: '1.2rem', marginLeft: '8px', fontWeight: 'bold' }}>
                {3} 
              </Typography>
            </Box>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <h1
                style={{
                  fontSize: '2rem',
                  margin: 0,
                }}
              >
                {driver.patent}
              </h1>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Typography variant="h5">{driver.name}</Typography>
          <Typography>
            {driver.brand} {driver.model}
          </Typography>
          <CardMedia
            component="img"
            image="/camionetaUberto.jpeg"
            alt="Camioneta Uberto"
            height={100}
            sx={{
              objectFit: 'contain',
            }}
          />
          <Typography fontWeight = 'bold' fontSize={20} textAlign={'center'} marginTop={0}>
            Price ${driver.price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
