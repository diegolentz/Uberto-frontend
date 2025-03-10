

import { Card, CardHeader, CardContent, Typography, Avatar, Box } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { recommProps } from "./recommendation"

export const CardRecom = ({recom} : {recom: recommProps}) => {
    return(
        <>
                <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                avatar={<Avatar src={recom.avatarUrl} alt={recom.name} />}
                title={<Typography fontWeight="bold">{recom.name}</Typography>}
                action={
                    <Box display="flex" alignItems="center">
                    <StarIcon sx={{ color: "gold" }} />
                    <Typography fontWeight="bold" ml={0.5}>
                        {recom.rating}
                    </Typography>
                    </Box>
                }
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {recom.date}
                </Typography>
                <Typography mt={1} variant="body1">
                    {recom.comment}
                </Typography>
                </CardContent>
                </Card> 
            </>
    )
}