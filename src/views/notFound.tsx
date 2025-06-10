import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#fafafa"
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "#f44336", mb: 2 }} />
      <Typography variant="h4" color="text.primary" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        La página que buscas no existe o fue eliminada.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/login")}
      >
        Ir al login
      </Button>
    </Box>
  );
};