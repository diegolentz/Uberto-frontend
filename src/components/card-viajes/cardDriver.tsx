import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { DriverCard } from '../../domain/driver';
import { TravelCard } from '../../domain/travel';

import * as styles from './cardDriverStyle';

interface CardDriverProps {
  value: DriverCard | TravelCard;
  isDriver: boolean;
  onClick: (data: DriverCard | TravelCard) => void;
}

export const CardDriver = ({ value, onClick, isDriver }: CardDriverProps) => {
  
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
          !isDriver ? (
            <Typography sx={styles.patentStyle}>
              {'serial' in value ? value.serial : ''}
            </Typography>
          ) : (
            <Box>
              <Typography sx={styles.userNameLastnameStyle}>
                {value.name} {'lastName' in value ? value.lastName : ''}
              </Typography>
              <Box sx={styles.iconUserStyle}>
                <GroupIcon sx={{ fontSize: '1.2rem' }} />
                <Typography sx={styles.rateStyle}>
                  {'pasaenger' in value ? value.pasaenger : ''}
                </Typography>
              </Box>
            </Box>
          )
        }
        action={
          <Box sx={styles.actionStyle}>
            {!isDriver ? (
              <Box sx={styles.passangerCountStyle}>
                <StarIcon />
                <Typography sx={styles.rateStyle}>
                  {3}
                </Typography>
              </Box>
            ) : (
              <Avatar sx={styles.imgUserStyle} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            )}
          </Box>
        }
      />
      <CardContent sx={styles.boxInfoStyle}>
        {!isDriver ? (
          <>
            <Box sx={styles.boxDataStyle}>
              <Typography sx={styles.nameStyle}>{value.name}</Typography>
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
        ) : (
          <Box sx={styles.boxInfoTravelStyle}>
            <Box>
              <Typography sx={styles.dataTravelStyle}>
                {'Origin'}
              </Typography>
              <Typography sx={styles.dataTravelStyle}>
                {'Destination'}
              </Typography>
              <Typography sx={styles.dataTravelStyle}>
                {'Date'}
              </Typography>
              <Typography sx={styles.priceTravelStyle}>
                {'Price'}
              </Typography>
            </Box>
            <Box sx={styles.infoTravelStyle}>

              <Typography sx={styles.infoTravelStyle}>
                {'origin' in value ? value.origin : ''}
              </Typography>

              <Typography sx={styles.infoTravelStyle}>
                {'destination' in value ? value.destination : ''}
              </Typography>

              <Typography sx={styles.infoTravelStyle}>
                
                {  `${(value as TravelCard).date}`  }
              </Typography>

              <Typography sx={styles.priceTravelStyle}>
                {'price' in value ? `$ ${value.price}` : ''}
              </Typography>

            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
