import React, { useState } from 'react';

// Importación del componente ModalRemito
import ModalRemito from '../components/ModalRemito';

// Importaciones de componentes de Material-UI
import { 
  Box, 
  Button, 
  Container, 
  Stack, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';

// Importaciones de iconos de Material-UI
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Datos de ejemplo para un remito
const remitoEjemplo = {
  numeroRemito: '0001',
  estado: 'autorizado',
  fechaEmision: '2025-05-15',
  destino: 'Destino Demo',
  razonSocial: 'Empresa Demo',
  cuit: '20-12345678-9',
  tipoCliente: 'Empresa privada',
  peso: '1000',
  volumen: '10',
  valor: '50000',
  categoria: 'metalurgica',
  pallets: '10',
  racks: '5',
  bultos: '20',
  tambores: '2',
  bobinas: '3',
  requiereRefrigeracion: false,
  observaciones: 'Sin observaciones',
  archivo: null,
  historial: [
    { estado: 'Autorizado', fecha: '15/5/2025' }
  ]
};

// Componente principal Documents
export default function Documents() {
  // Estados del componente
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState('alta');
  const [remito, setRemito] = useState(null);

  // Hooks de Material-UI para responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Función para abrir el modal en modo alta
  const abrirAlta = () => {
    setModo('alta');
    setRemito(null);
    setOpen(true);
  };

  // Función para abrir el modal en modo edición
  const abrirEdicion = () => {
    setModo('modificacion');
    setRemito(remitoEjemplo);
    setOpen(true);
  };

  // Función para abrir el modal en modo consulta
  const abrirConsulta = () => {
    setModo('consulta');
    setRemito(remitoEjemplo);
    setOpen(true);
  };

  // Renderizado del componente
  return (
    <Container maxWidth="lg">
      {/* Barra de botones */}
      <Box sx={{ py: 3 }}>
        <Stack 
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ 
            justifyContent: { xs: 'stretch', sm: 'flex-start' },
            width: '100%'
          }}
        >
          {/* Botón Nuevo Remito */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={abrirAlta}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Nuevo Remito
          </Button>

          {/* Botón Editar Remito */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={abrirEdicion}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Editar Remito
          </Button>

          {/* Botón Consultar Remito */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={abrirConsulta}
            fullWidth={isMobile}
            sx={{ textTransform: 'none' }}
          >
            Consultar Remito
          </Button>
        </Stack>
      </Box>

      {/* Modal de Remito */}
      <ModalRemito
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        remito={remito}
      />
    </Container>
  );
}
