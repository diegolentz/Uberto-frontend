import { Card, CardHeader, Typography, Box, Avatar, CardContent, Button } from "@mui/material";
import { TravelCard } from "../../domain/travel";
import * as styles from './cardDriverStyle';
import GroupIcon from '@mui/icons-material/Group';
import { utils } from "../../utils/formatDate";
import { useState } from "react";
import { Recommendation } from "../../domain/recomendation";
import { RecommendationCard } from "../recommendation/recommendation";
import { Role } from "../../views/profile";






export const CardTravel = ({ value }: { value: TravelCard }) => {
  const recomEmpty: Recommendation = new Recommendation(value.id, '', new Date, 0, '', 0, '', true, true, '', '')
  const [flag, setFlag] = useState(false)
  const role = sessionStorage.getItem("role") as Role
  const handleCreate = () => {
    setFlag(!flag)
  }


  return (
    <Card sx={styles.cardBodyStyle} >
      <CardHeader

        sx={styles.cardHeaderStyle}
        title={
          <Box>
            <Typography sx={styles.userNameLastnameStyle}>
              {role == 'passenger' ? value.driverName : value.passengerName}
            </Typography>
            <Box sx={styles.iconUserStyle}>
              <GroupIcon sx={{ fontSize: '1.2rem' }} />
              <Typography sx={styles.rateStyle}>
                {value.numberPasaenger}
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
          {value.origin}
        </Typography>

        <Typography sx={styles.infoTravelStyle}>
          {value.destination}
        </Typography>

        <Typography sx={styles.infoTravelStyle}>
          {
          `${utils.setDate(value.date)} |
             ${utils.setStartTime(value.date)} -
             ${utils.setEndTime((value.date), (value.duration))}hs`
          }
        </Typography>

        <Typography sx={styles.priceTravelStyle}>
          {`$ ${value.price}`}
        </Typography>

        </Box>
      </Box>
      </CardContent>

      {new Date(value.date) < new Date() && (
      <>

        <Button onClick={handleCreate}>Calificar</Button>
        {flag && <RecommendationCard recom={recomEmpty} handle={handleCreate}></RecommendationCard>}


      </>
      )}
    </Card>
  );



}