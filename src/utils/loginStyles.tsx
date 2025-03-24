import { Box, Button, styled } from "@mui/material";

export const LoginFormContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));