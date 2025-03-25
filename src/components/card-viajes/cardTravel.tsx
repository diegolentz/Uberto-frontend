import { Card, CardHeader, Typography, Box, Avatar, CardContent, CardMedia } from "@mui/material";
import { DriverCard } from "../../domain/driver";
import { TravelCard } from "../../domain/travel";
import * as styles from './cardDriverStyle';
import GroupIcon from '@mui/icons-material/Group';
import { utils } from "../../utils/formatDate";






export const CardTravel = ({value}:{value : TravelCard}) => {



    return (
        <Card sx={styles.cardBodyStyle} >
          <CardHeader
            sx={styles.cardHeaderStyle}
            title={
                <Box>
                  <Typography sx={styles.userNameLastnameStyle}>
                    {(value as TravelCard).passengerName} 
                  </Typography>
                  <Box sx={styles.iconUserStyle}>
                    <GroupIcon sx={{ fontSize: '1.2rem' }} />
                    <Typography sx={styles.rateStyle}>
                      {'numberPassengers' in value && typeof value.numberPassengers === 'number'  ? value.numberPassengers : 0}
                    </Typography>
                  </Box>
                </Box>
            }
            action={
              <Box sx={styles.actionStyle}>
                  <Avatar sx={styles.imgUserStyle} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Box>
            }
          />
          <CardContent sx={styles.boxInfoStyle}>
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
                    {  
                    `${utils.setDate((value as TravelCard).date)} |
                     ${utils.setStartTime((value as TravelCard).date)} -
                     ${utils.setEndTime(((value as TravelCard).date),((value as TravelCard).duration))}hs`  
                    }
                  </Typography>
    
                  <Typography sx={styles.priceTravelStyle}>
                    {'price' in value ? `$ ${value.price}` : ''}
                  </Typography>
    
                </Box>
              </Box>
          </CardContent>
        </Card>
      );



}