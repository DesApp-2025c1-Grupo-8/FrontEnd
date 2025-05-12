import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
  Tooltip,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const tiposCliente = [
  { value: 'empresa privada', label: 'Empresa Privada' },
  { value: 'organismo estatal', label: 'Organismo Estatal' },
  { value: 'particular', label: 'Particular' },
];

const camposObligatorios = [
  'razonSocial',
  'cuit',
  'tipoCliente',
  'direccion',
  'telefono',
  'email',
  'personasAutorizadas',
];

const camposIniciales = {
  razonSocial: '',
  cuit: '',
  tipoCliente: '',
  direccion: '',
  telefono: '',
  email: '',
  personasAutorizadas: '',
};

function ModalCliente({ open, onClose, modo = 'alta', cliente = null }) {
  // Estado interno para los campos y el modo visual
  const [form, setForm] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [mensajesError, setMensajesError] = useState({});
  const [modoInterno, setModoInterno] = useState(modo); // 'alta', 'consulta', 'modificacion'

  useEffect(() => {
    if (modo === 'alta') {
      setForm(camposIniciales);
      setModoInterno('alta');
    } else if (cliente) {
      setForm({ ...cliente });
      setModoInterno(modo);
    }
    setErrores({});
  }, [open, modo, cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const mensajesError = {};

    // Validación de campos obligatorios
    camposObligatorios.forEach((campo) => {
      if (!form[campo] || form[campo].toString().trim() === '') {
        nuevosErrores[campo] = true;
        // No agregamos mensaje de error para campos obligatorios vacíos
      }
    });

    // Validación de CUIT/RUT (formato XX-XXXXXXXX-X para CUIT o XX.XXX.XXX-X para RUT)
    if (form.cuit && !/^\d{2}-\d{8}-\d{1}$/.test(form.cuit) && !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(form.cuit)) {
      nuevosErrores.cuit = true;
      mensajesError.cuit = 'El CUIT debe tener formato XX-XXXXXXXX-X o el RUT formato XX.XXX.XXX-X';
    }

    // Validación de email
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = true;
      mensajesError.email = 'Ingrese un email válido';
    }

    // Validación de teléfono (solo números)
    if (form.telefono && !/^\d+$/.test(form.telefono)) {
      nuevosErrores.telefono = true;
      mensajesError.telefono = 'El teléfono debe contener solo números';
    }

    setErrores(nuevosErrores);
    setMensajesError(mensajesError);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = () => {
    validar(); // Solo validación visual
  };

  const handleEditar = () => {
    setModoInterno('modificacion');
  };

  const handleEliminar = () => {
    // Solo visual
  };

  // Determina si los campos son editables
  const camposEditables = modoInterno === 'alta' || modoInterno === 'modificacion';

  // Titulo segun el modo
  const getTitulo = () => {
    if (modoInterno === 'alta') return 'Nuevo Cliente';
    if (modoInterno === 'modificacion') return 'Editar Cliente';
    return 'Información del Cliente';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ border: '3px solid #0097a7', borderRadius: 3, m: 1, position: 'relative' }}>
        <DialogTitle sx={{ pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">{getTitulo()}</Typography>
          <Box>
            {modoInterno === 'consulta' && (
              <>
                <Tooltip title="Editar">
                  <IconButton onClick={handleEditar}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={handleEliminar}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Cerrar">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información del cliente
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Razón Social"
                    name="razonSocial"
                    value={form.razonSocial}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.razonSocial}
                    size="small"
                  />
                  {errores.razonSocial && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="CUIT/RUT"
                    name="cuit"
                    value={form.cuit}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.cuit}
                    helperText={mensajesError.cuit}
                    size="small"
                  />
                  {errores.cuit && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    select
                    label="Tipo de Cliente"
                    name="tipoCliente"
                    value={form.tipoCliente}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.tipoCliente}
                    size="small"
                  >
                    {tiposCliente.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errores.tipoCliente && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Dirección"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.direccion}
                    size="small"
                  />
                  {errores.direccion && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Teléfono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.telefono}
                    helperText={mensajesError.telefono}
                    size="small"
                  />
                  {errores.telefono && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.email}
                    helperText={mensajesError.email}
                    size="small"
                  />
                  {errores.email && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Personas Autorizadas"
                    name="personasAutorizadas"
                    value={form.personasAutorizadas}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.personasAutorizadas}
                    size="small"
                  />
                  {errores.personasAutorizadas && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
            </Grid>
          </Box>
          {(modoInterno === 'alta' || modoInterno === 'modificacion') && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleGuardar}
              >
                Guardar
              </Button>
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default ModalCliente; 