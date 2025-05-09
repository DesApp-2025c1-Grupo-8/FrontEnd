import React, { useState } from 'react';
import ModalDestino from '../components/ModalDestino';
import { 
  Box, 
  Button, 
  Container, 
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const destinoEjemplo = {
  nombre: 'Destino Demo',
  localidad: 'Ciudad Demo',
  provincia: 'Provincia Demo',
  pais: 'País Demo',
  calle: 'Calle Falsa',
  altura: '123',
  telefono: '123456789',
  email: 'demo@destino.com',
};

function Destinations() {
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState('alta');
  const [destino, setDestino] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const abrirAlta = () => {
    setModo('alta');
    setDestino(null);
    setOpen(true);
  };

  const abrirEdicion = () => {
    setModo('modificacion');
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  const abrirConsulta = () => {
    setModo('consulta');
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={2}
          sx={{ 
            justifyContent: { xs: 'stretch', sm: 'flex-start' },
            width: '100%'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={abrirAlta}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Nuevo Destino
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={abrirEdicion}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Editar Destino
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={abrirConsulta}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Consultar Destino
          </Button>
        </Stack>
      </Box>
      <ModalDestino
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        destino={destino}
      />
    </Container>
  );
}

export default Destinations;