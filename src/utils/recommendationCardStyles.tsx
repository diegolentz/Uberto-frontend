import { Paper, styled } from "@mui/material";


export const StyledCard = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.secondary,
    boxShadow: '1px 2px 1px -1px rgba(147, 33, 170, 0.8),1px 1px 1px 0px rgba(154, 38, 135, 0.64),1px 1px 3px 0px rgba(203, 6, 233, 0.7)'
}));