import { Card, CardHeader, Typography, Box, Avatar, CardContent, Button } from "@mui/material";
import { TravelCard } from "../../domain/travel";
import * as styles from './cardDriverStyle';
import GroupIcon from '@mui/icons-material/Group';
import { utils } from "../../utils/formatDate";
import { useState } from "react";
import { Recommendation } from "../../domain/recomendation";
import { RecommendationCard } from "../recommendation/recommendation";
import { Role } from "../../views/profile";
import { AnimatePresence, motion } from "framer-motion";






export const CardTravel = ({ value }: { value: TravelCard }) => {
  const recomEmpty: Recommendation = new Recommendation(value.id, '', new Date, 0, '', 0, value.driverName, true, true, value.imgPassenger, value.imgDriver)
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
            {role == 'passenger' ? (
              <Avatar
                sx={{ ...styles.imgUserStyle, width: 45, height: 45 }}
                alt="Remy Sharp"
                src={value.imgDriver}
              />
            ) : (
              <Avatar
                sx={{ ...styles.imgUserStyle, width: 45, height: 45 }}
                alt="Remy Sharp"
                src={value.imgPassenger}
              />
            )}
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

      <AnimatePresence>
  {new Date(value.date) < new Date() && role === "passenger" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      style={{ overflow: "hidden" }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            marginRight: "0rem",
            width: "50%",
            height: "2rem",
          }}
          variant="contained"
          onClick={() => setFlag((prev) => !prev)} // Alternar entre abrir/cerrar
        >
          {flag ? "Cancelar" : "Calificar"}
        </Button>
      </Box>

      <AnimatePresence>
        {flag && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <RecommendationCard recom={recomEmpty} handle={() => setFlag(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>


    </Card>
  );



}