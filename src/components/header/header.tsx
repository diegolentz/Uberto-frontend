import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { appBarStyles, typographyStyles } from './headerStyle';

export const HeaderComponent = () => {
 
  return (
    <AppBar position="sticky" style={{ background: '#430c8c' }} sx={appBarStyles}>
      <Typography variant="h5" component="a" href="#header" sx={typographyStyles}>
        Uberto
      </Typography>
    </AppBar>
  );
};
