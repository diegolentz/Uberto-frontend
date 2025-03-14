import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Driver, Travel } from '../../domain/driver';
import * as styles from './cardDriverStyle';


interface CardDriverProps {
  value: Driver | Travel
  type: Boolean
}


export const CardDriver = ({ type, value }: CardDriverProps) => {
  // const [driver] = useState<Driver>(driverMock);
  const isDriver = type
  const data = value


  return (
    <>

      <Card sx={styles.cardBodyStyle}>
        <CardHeader
          sx={styles.cardHeaderStyle}
          title={
            !isDriver ? (
              <Typography sx={styles.patentStyle}>
                {'patent' in data ? data.patent : ''}
              </Typography>
            ) : (
              <Box>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {data.name} {'lastName' in data ? data.lastName : ''}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                  <GroupIcon sx={{ fontSize: '1.2rem' }} />
                <Typography sx={styles.rateStyle}>
                  {'pasaenger' in data ? data.pasaenger : ''}
                </Typography>
                </Box>
              </Box>
            )
          }
          action={
            <Box sx={{marginRight: '1rem'}} >
              {!isDriver ? (
                <>
                <Box sx={{display: 'flex',height: '2rem', alignItems: 'center', gap: '0.3rem'}}>
                  <StarIcon/>
                  <Typography sx={styles.rateStyle}>
                    {3}
                  </Typography>
                  </Box>
                </>
              ) : (
                <Avatar sx={{height: '2.3rem', width: '2.3rem'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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

              <Box >

                <Typography sx={styles.dataTravelStyle}>
                  {'Origin'}
                </Typography >
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

              </Box>

            </Box>
          )}
        </CardContent>
      </Card >
    </>
  );
};
