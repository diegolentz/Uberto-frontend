import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { DriverCard } from '../../domain/driver';
import { TravelCard } from '../../domain/travel';

import * as styles from './cardDriverStyle';


interface CardDriverProps {
  value: DriverCard | TravelCard;
  onClick: (data: DriverCard | TravelCard) => void; // Corrige el typo en `onClick`
}


export const CardDriver = ({ value, onClick }: CardDriverProps) => {
  const isDriver = sessionStorage.getItem("isDriver") === "true";
  const data = value


  const clickCard = () => {
    if (!isDriver) {
      onClick(value); // Llama correctamente la función con `value`
    }
  };

  return (
    <>

      <Card sx={styles.cardBodyStyle} onClick= {clickCard} >
        <CardHeader
          sx={styles.cardHeaderStyle}
          title={
            !isDriver ? (
              <Typography sx={styles.patentStyle}>
                {'patent' in data ? data.patent : ''}
              </Typography>
            ) : (
              <Box>
                <Typography sx={styles.userNameLastnameStyle}>
                  {data.name} {'lastName' in data ? data.lastName : ''}
                </Typography>
                <Box sx={styles.iconUserStyle}>
                  <GroupIcon sx={{ fontSize: '1.2rem' }} />
                  <Typography sx={styles.rateStyle}>
                    {'pasaenger' in data ? data.pasaenger : ''}
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
                /* falta atributo imagen en el back */
              )}
            </Box>
          }
        />
        <CardContent sx={styles.boxInfoStyle}>
          {!isDriver ? (
            <>
              <Box sx={styles.boxDataStyle}>
                <Typography sx={styles.nameStyle}>{data.name}</Typography>
                <Typography sx={styles.brandModelStyle}>
                  {'model' in data ? `${data.brand}  ${data.model}` : ''}
                </Typography>
                <Typography sx={styles.priceStyle}>
                  Price ${data.price}
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
                  {'origin' in data ? data.origin : ''}
                </Typography>
                <Typography sx={styles.infoTravelStyle}>
                  {'destination' in data ? data.destination : ''}
                </Typography>
                <Typography sx={styles.infoTravelStyle}>
                  {'date' in data ? `${data.date.getDay()}/${data.date.getMonth()}/${data.date.getFullYear()} | ${data.date.getHours()}:${data.date.getMinutes()}` : ''}
                </Typography>
                <Typography sx={styles.priceTravelStyle}>
                  {'price' in data ? `$ ${data.price}` : ''}
                </Typography>
              {/* {'date' in data && data.date.getHours() > new Date().getHours() ? (
                <Button>Confirmar</Button>
              ) : null} */}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};
