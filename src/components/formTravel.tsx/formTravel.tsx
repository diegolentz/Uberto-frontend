import { Box, Button, TextField } from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',   // Centra los elementos horizontalmente
  justifyContent: 'center', // Centra los elementos verticalmente
  gap: '10px',
  width: '80%',  // Ajusta el ancho del contenedor (porcentaje de la pantalla)
  maxWidth: '500px',  // Limita el ancho máximo
  margin: '1rem auto',  // Esto centra el contenedor en la página
}));

const Field = styled(TextField)(({ theme }) =>({
    width : '100%',
}))  

export const FormTravel = () => {
  return (
    <>
      <Container>
        <Field 
          color="secondary" 
          label="Origen"  
          type="text" 
        />
        <Field 
          color="secondary" 
          label="Destino" 
          type="text" 
        />
        <Field 
          color="secondary" 
          label="Fecha"   
          type="date" 
        />
        <Field 
          color="secondary" 
          label="Cantidad de pasajeros" 
          type="number" 
          inputProps={{ min: 0 }}
        />
        
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          endIcon={<SearchIcon sx={{ fontSize: '30px' }} />}
          fullWidth  
        >
          Buscar
        </Button>
      </Container>
    </>
  );
};
