import StarIcon from '@mui/icons-material/Star';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import { Driver, driverMock } from '../../domain/driver';
import * as styles from './cardDriverStyle';

export const CardDriver = () => {
  const [driver, setDriver] = useState<Driver>(driverMock);



  return (
    <>

      <Card sx={styles.cardBodyStyle}>
        <CardHeader sx={styles.cardHeaderStyle}
          action={
            <Box sx={styles.headerIconsStyle}>
              <StarIcon sx={styles.starIconStyle} />
              <Typography sx={styles.rateStyle}>
                {3}
              </Typography>
            </Box>
          }
          title={
            <Typography sx={styles.patentStyle}>
              {driver.patent}
            </Typography>
          }
        />
        <CardContent sx={styles.boxInfoStyle}>

          <Box sx={styles.boxDataStyle}>
            <Typography sx={styles.nameStyle}>{driver.name}</Typography>
            <Typography sx={styles.brandModelStyle}>
              {driver.brand}  {driver.model}
            </Typography>
            <Typography sx={styles.priceStyle}>
              Price ${driver.price}
            </Typography>
          </Box>

          <CardMedia
            component="img"
            image="/camionetaUberto.jpeg"
            alt="Camioneta Uberto"
            sx={styles.imgStyle}
          />
        </CardContent>
      </Card>
    </>
  );
};
