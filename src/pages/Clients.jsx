import React, { useState } from 'react';
import ModalCliente from '../components/ModalCliente';
// Importaciones de componentes de Material-UI
import { 
  Box,              // Contenedor flexible para layout
  Button,           // Componente de botón
  Container,        // Contenedor con márgenes automáticos
  Stack,            // Contenedor con espaciado entre elementos
  useTheme,         // Hook para acceder al tema de Material-UI
  useMediaQuery     // Hook para diseño responsive
} from '@mui/material';

// Importaciones de íconos de Material-UI
import AddIcon from '@mui/icons-material/Add';           // Ícono de agregar
import EditIcon from '@mui/icons-material/Edit';         // Ícono de editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícono de ver

// Datos de ejemplo para un cliente
const clienteEjemplo = {
  razonSocial: 'Empresa Demo',
  cuit: '20-12345678-9',
  tipoCliente: 'empresa privada',
  continente: 'América',
  pais: 'Argentina',
  provincia: 'Buenos Aires',
  municipio: 'San Isidro',
  calle: 'Av. Falsa',
  altura: '123',
  telefono: '123456789',
  email: 'demo@empresa.com',
  personasAutorizadas: 'Juan Pérez, Ana Gómez'
};

// Componente principal de la página de clientes
export default function Clients() {
  // Estados para controlar el modal
  const [open, setOpen] = useState(false);        // Controla si el modal está abierto
  const [modo, setModo] = useState('alta');      // Modo del modal (alta, modificación, consulta)
  const [cliente, setCliente] = useState(null);  // Datos del cliente seleccionado
  
  // Hooks para responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Funciones para abrir el modal en diferentes modos
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

  // Renderizado de la página
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Stack de botones con diseño responsive */}
        <Stack 
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ 
            justifyContent: { xs: 'stretch', sm: 'flex-start' },
            width: '100%'
          }}
        >
          {/* Botón Nuevo Cliente */}
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

          {/* Botón Editar Cliente */}
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

          {/* Botón Consultar Cliente */}
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
      
      {/* Modal de cliente */}
      <ModalCliente
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        cliente={cliente} 
      />
    </Container>
  );
}