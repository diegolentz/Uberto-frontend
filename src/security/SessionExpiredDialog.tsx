import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SessionExpiredDialog({ open }: { open: boolean }) {
  const navigate = useNavigate();

  const handleClose = () => {
    // Limpia storage si querés
    // localStorage.clear();
    // Redirige al Home
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sesión expirada</DialogTitle>
      <DialogContent>
        Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}