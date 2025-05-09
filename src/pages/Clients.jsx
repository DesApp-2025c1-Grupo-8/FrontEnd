import React, { useState } from 'react';
import ModalCliente from '../components/ModalCliente';
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

const clienteEjemplo = {
  razonSocial: 'Empresa Demo',
  cuit: '20-12345678-9',
  tipoCliente: 'empresa privada',
  direccion: 'Calle Falsa 123',
  telefono: '123456789',
  email: 'demo@empresa.com',
  personasAutorizadas: 'Juan Pérez, Ana Gómez'
};

export default function Clients() {
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState('alta');
  const [cliente, setCliente] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const abrirAlta = () => {
    setModo('alta');
    setCliente(null);
    setOpen(true);
  };

  const abrirEdicion = () => {
    setModo('modificacion');
    setCliente(clienteEjemplo);
    setOpen(true);
  };

  const abrirConsulta = () => {
    setModo('consulta');
    setCliente(clienteEjemplo);
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
            Nuevo Cliente
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={abrirEdicion}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Editar Cliente
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={abrirConsulta}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Consultar Cliente
          </Button>
        </Stack>
      </Box>
      <ModalCliente
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        cliente={cliente}
      />
    </Container>
  );
}