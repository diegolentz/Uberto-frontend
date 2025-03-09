import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export const HeaderComponent = () => {


  return <>
    <AppBar position="sticky" style={{ background: '#430c8c'}} className='AppBar' sx={{borderBottomRightRadius: '7%' , borderBottomLeftRadius: '7%', boxShadow: 0}}>
      <Container>
        <Toolbar disableGutters>

          <Typography
            variant="h5"
            component="a"
            href="#header"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Uberto
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  </>
};
