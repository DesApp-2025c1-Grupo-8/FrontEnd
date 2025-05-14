import React, { useState } from 'react';
import ModalDestino from '../components/ModalDestino';
// Importaciones de componentes de Material-UI
import { 
  Box,              // Contenedor flexible para layout
  Button,           // Componente de botón
  Container,        // Contenedor con márgenes automáticos
  Stack,            // Contenedor con espaciado entre elementos
  useTheme,         // Hook para acceder al tema de Material-UI
  useMediaQuery     // Hook para diseño responsive
} from '@mui/material';

// Íconos de Material-UI
import AddIcon from '@mui/icons-material/Add';           // Ícono de agregar
import EditIcon from '@mui/icons-material/Edit';         // Ícono de editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícono de ver

// Datos de ejemplo para un destino
const destinoEjemplo = {
  nombre: 'Destino Demo',
  continente: 'América',
  pais: 'Argentina',
  provincia: 'Buenos Aires',
  municipio: 'La Plata',
  calle: 'Calle Falsa',
  altura: '123',
  telefono: '123456789',
  email: 'demo@destino.com',
};

export default function Destinations() {
  // Estados para controlar el modal
  const [open, setOpen] = useState(false);        // Controla si el modal está abierto
  const [modo, setModo] = useState('alta');      // Modo del modal (alta, modificación, consulta)
  const [destino, setDestino] = useState(null);  // Datos del destino seleccionado
  
  // Hooks para responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Funciones para abrir el modal en diferentes modos
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

  // Renderizado de la página
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Stack de botones */}
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={2}
          sx={{ 
            justifyContent: { xs: 'stretch', sm: 'flex-start' },
            width: '100%'
          }}
        >
          {/* Botón Nuevo Destino */}
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

          {/* Botón Editar Destino */}
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

          {/* Botón Consultar Destino */}
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
      
      {/* Modal de destino */}
      <ModalDestino
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        destino={destino}
      />
    </Container>
  );
}