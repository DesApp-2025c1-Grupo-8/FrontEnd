// Este componente maneja la creación, edición y visualización de información de clientes.
// Permite tres modos de operación: alta (crear nuevo cliente), modificación (editar cliente existente)
// y consulta (ver información del cliente).

import React, { useState, useEffect } from 'react';
// Importaciones de componentes de Material-UI para la interfaz
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
// Importaciones de iconos de Material-UI
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Definición de los tipos de cliente disponibles en el sistema
const tiposCliente = [
  { value: 'empresa privada', label: 'Empresa Privada' },
  { value: 'organismo estatal', label: 'Organismo Estatal' },
  { value: 'particular', label: 'Particular' },
];

// Lista de campos que son obligatorios para el registro de un cliente
const camposObligatorios = [
  'razonSocial',
  'cuit',
  'tipoCliente',
  'continente',
  'pais',
  'provincia',
  'municipio',
  'calle',
  'altura',
  'telefono',
  'email',
  'personasAutorizadas',
];

// Valores iniciales para el formulario de cliente
const camposIniciales = {
  razonSocial: '',
  cuit: '',
  tipoCliente: '',
  continente: '',
  pais: '',
  provincia: '',
  municipio: '',
  calle: '',
  altura: '',
  telefono: '',
  email: '',
  personasAutorizadas: '',
};

function ModalCliente({ open, onClose, modo = 'alta', cliente = null }) {
  // Estados del componente
  const [form, setForm] = useState(camposIniciales); // Estado del formulario
  const [errores, setErrores] = useState({}); // Estado de errores de validación
  const [mensajesError, setMensajesError] = useState({}); // Mensajes de error específicos
  const [modoInterno, setModoInterno] = useState(modo); // Modo interno del modal

  // Efecto que se ejecuta cuando cambia el modo o se abre el modal
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

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida todos los campos del formulario según las reglas de negocio
  const validar = () => {
    const nuevosErrores = {};
    const mensajesError = {};

    // Validación de campos obligatorios
    camposObligatorios.forEach((campo) => {
      if (!form[campo] || form[campo].toString().trim() === '') {
        nuevosErrores[campo] = true;
      }
    });

    // Validación de CUIT/RUT
    if (form.cuit && !/^\d{2}-\d{8}-\d{1}$/.test(form.cuit) && !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(form.cuit)) {
      nuevosErrores.cuit = true;
      mensajesError.cuit = 'El CUIT debe tener formato XX-XXXXXXXX-X o el RUT formato XX.XXX.XXX-X';
    }

    // Validación de email
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = true;
      mensajesError.email = 'Ingrese un email válido';
    }

    // Validación de teléfono
    if (form.telefono && !/^\d+$/.test(form.telefono)) {
      nuevosErrores.telefono = true;
      mensajesError.telefono = 'El teléfono debe contener solo números';
    }

    // Validación de altura
    if (form.altura && !/^\d+$/.test(form.altura)) {
      nuevosErrores.altura = true;
      mensajesError.altura = 'La altura debe contener solo números';
    }

    // Validación de continente
    if (form.continente && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(form.continente)) {
      nuevosErrores.continente = true;
      mensajesError.continente = 'El continente debe contener solo letras';
    }

    // Validación de país
    if (form.pais && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(form.pais)) {
      nuevosErrores.pais = true;
      mensajesError.pais = 'El país debe contener solo letras';
    }

    // Validación de provincia
    if (form.provincia && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(form.provincia)) {
      nuevosErrores.provincia = true;
      mensajesError.provincia = 'La provincia debe contener solo letras';
    }

    // Validación de municipio
    if (form.municipio && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(form.municipio)) {
      nuevosErrores.municipio = true;
      mensajesError.municipio = 'El municipio debe contener solo letras';
    }

    // Validación de calle
    if (form.calle && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.]+$/.test(form.calle)) {
      nuevosErrores.calle = true;
      mensajesError.calle = 'La calle debe contener solo letras y/o números';
    }

    setErrores(nuevosErrores);
    setMensajesError(mensajesError);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Maneja el guardado del formulario
  const handleGuardar = () => {
    validar();
  };

  // Cambia el modo del modal a 'modificacion'
  const handleEditar = () => {
    setModoInterno('modificacion');
  };

  // Maneja la eliminación del cliente
  const handleEliminar = () => {
    // Solo visual de momento
  };

  // Determina si los campos son editables según el modo
  const camposEditables = modoInterno === 'alta' || modoInterno === 'modificacion';

  const getTitulo = () => {
    if (modoInterno === 'alta') return 'Nuevo Cliente';
    if (modoInterno === 'modificacion') return 'Editar Cliente';
    return 'Información del Cliente';
  };

  // Renderizado del componente
  return (
    // Modal principal que contiene el formulario
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Contenedor principal con borde y estilo */}
      <Box sx={{ border: '3px solid #0097a7', borderRadius: 3, m: 1, position: 'relative' }}>
        {/* Encabezado del modal con título y botones de acción */}
        <DialogTitle sx={{ pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">{getTitulo()}</Typography>
          <Box>
            {/* Botones de editar y eliminar solo visibles en modo consulta */}
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
            {/* Botón para cerrar el modal */}
            <Tooltip title="Cerrar">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        {/* Contenido principal del modal */}
        <DialogContent>
          {/* Sección de información del cliente */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información del cliente
            </Typography>
            {/* Grid de campos del formulario */}
            <Grid container spacing={2} alignItems="center">
              {/* Campo Razón Social */}
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
              {/* Campo CUIT/RUT */}
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
              {/* Campo Tipo de Cliente (selector) */}
              <Grid item xs={12} sm={6} sx={{width: '50%'}}>
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
              {/* Campos de ubicación geográfica */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Continente"
                    name="continente"
                    value={form.continente}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.continente}
                    helperText={mensajesError.continente}
                    size="small"
                  />
                  {errores.continente && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="País"
                    name="pais"
                    value={form.pais}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.pais}
                    helperText={mensajesError.pais}
                    size="small"
                  />
                  {errores.pais && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Provincia"
                    name="provincia"
                    value={form.provincia}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.provincia}
                    helperText={mensajesError.provincia}
                    size="small"
                  />
                  {errores.provincia && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Municipio"
                    name="municipio"
                    value={form.municipio}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.municipio}
                    helperText={mensajesError.municipio}
                    size="small"
                  />
                  {errores.municipio && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Calle"
                    name="calle"
                    value={form.calle}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.calle}
                    helperText={mensajesError.calle}
                    size="small"
                  />
                  {errores.calle && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Altura"
                    name="altura"
                    value={form.altura}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.altura}
                    size="small"
                  />
                  {errores.altura && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
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
          {/* Botón de guardar (visible solo en modos alta y modificación) */}
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