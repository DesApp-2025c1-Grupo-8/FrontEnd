import React, { useState } from 'react';
import ModalRemito from '../components/ModalRemito';
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

// Datos de ejemplo para un remito
const remitoEjemplo = {
  estado: 'en_preparacion',
  fechaEmision: '2025-10-24',
  destino: 'Sucursal BA-135',
  razonSocial: 'Metalúrgica del Oeste S.A.',
  cuit: '37-84658263-0',
  tipoCliente: 'empresa privada',
  peso: '59.910',
  volumen: '7.65',
  valor: '72300000',
  categoria: 'metalurgica',
  pallets: '0',
  racks: '0',
  bultos: '0',
  tambores: '0',
  bobinas: '0',
  requiereRefrigeracion: true,
  observaciones: 'Entregar en horario comercial. Manipular con cuidado.',
  documentacion: '',
};

export default function Documents() {
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState('alta');
  const [remito, setRemito] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const abrirAlta = () => {
    setModo('alta');
    setRemito(null);
    setOpen(true);
  };

  const abrirEdicion = () => {
    setModo('modificacion');
    setRemito(remitoEjemplo);
    setOpen(true);
  };

  const abrirConsulta = () => {
    setModo('consulta');
    setRemito(remitoEjemplo);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Stack
          direction={isMobile ? 'column' : 'row'}
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
            Nuevo Remito
          </Button>
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
      <ModalRemito
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        remito={remito}
      />
    </Container>
  );
}
