import StarIcon from '@mui/icons-material/Star';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { DriverCard } from '../../domain/driver';

import * as styles from '../../utils/cardDriverStyle';

interface CardDriverProps {
  value: DriverCard
  onClick: (data: DriverCard) => void;
}

export const CardDriver = ({ value, onClick }: CardDriverProps) => {
  const isDriver = localStorage.getItem('isDriver') === 'driver';

  const clickCard = () => {
    if (!isDriver) {
      onClick(value); // Llama correctamente la función con `value`
    }
  };


  return (
    <Card sx={styles.cardBodyStyle} onClick={clickCard}>
      <CardHeader
        sx={styles.cardHeaderStyle}
        title={
          <>
            <Typography sx={styles.patentStyle}>
              {'serial' in value ? value.serial : ''}
            </Typography>
          </>
        }
        action={
          <Box sx={styles.actionStyle}>
            <Box sx={styles.passangerCountStyle}>
              <StarIcon />
              <Typography sx={styles.rateStyle}>
                {(value as DriverCard).rating}
              </Typography>
            </Box>
          </Box>
        }
      />
      <CardContent sx={styles.boxInfoStyle}>
        <>
          <Box sx={styles.boxDataStyle}>
            <Typography sx={styles.nameStyle}>{(value as DriverCard).name}</Typography>
            <Typography sx={styles.brandModelStyle}>
              {'model' in value ? `${value.brand}  ${value.model}` : ''}
            </Typography>
            <Typography sx={styles.priceStyle}>
              Price ${value.price}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            image="/camionetaUberto.jpeg"
            alt="Camioneta Uberto"
            sx={styles.imgStyle}
          />
        </>
      </CardContent >
    </Card >
  );
};
