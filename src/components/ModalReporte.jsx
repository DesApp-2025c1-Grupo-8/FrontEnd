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
  Button,
  FormControl,
  InputLabel,
  Select,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// Función para generar ID único de reporte
const generarIdReporte = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `REP-${timestamp}-${random}`;
};

// Tipos de reportes disponibles
const tiposReporte = [
  { value: 'volumen_por_cliente', label: 'Volumen total de mercadería por cliente/período' },
  { value: 'distribucion_geografica', label: 'Distribución geográfica de orígenes y destinos' },
  { value: 'valor_por_tipo', label: 'Análisis de valor declarado por tipo de mercadería' }
];

// Campos obligatorios según el tipo de reporte
const camposObligatoriosPorTipo = {
  volumen_por_cliente: ['fechaInicio', 'fechaFin', 'clientes'],
  distribucion_geografica: ['fechaInicio', 'fechaFin'],
  valor_por_tipo: ['fechaInicio', 'fechaFin', 'categoriasMercaderia']
};

// Categorías de mercadería
const categoriasMercaderia = [
  { value: 'metalurgica', label: 'Metalúrgica' },
  { value: 'automotriz', label: 'Automotriz' },
  { value: 'retail', label: 'Retail' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'farmaceutica', label: 'Farmacéutica' },
  { value: 'papeleria', label: 'Papelería' },
  { value: 'calzado', label: 'Calzado' },
  { value: 'indumentaria', label: 'Indumentaria' },
  { value: 'laboratorio', label: 'Laboratorio' },
  { value: 'bazar', label: 'Bazar' }
];

function ModalReporte({ open, onClose, modo = 'alta' }) {
  const [form, setForm] = useState({
    idReporte: generarIdReporte(),
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: '',
    clientes: [],
    categoriasMercaderia: []
  });

  const [errores, setErrores] = useState({});
  const [mensajesError, setMensajesError] = useState({});
  const [clientesDisponibles, setClientesDisponibles] = useState([]); // Se cargaría desde Redux

  useEffect(() => {
    if (open) {
      setForm({
        idReporte: generarIdReporte(),
        tipoReporte: '',
        fechaInicio: '',
        fechaFin: '',
        clientes: [],
        categoriasMercaderia: []
      });
      setErrores({});
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const mensajes = {};

    // Validar campos obligatorios según el tipo de reporte
    const camposObligatorios = camposObligatoriosPorTipo[form.tipoReporte] || [];
    camposObligatorios.forEach(campo => {
      if (!form[campo] || (Array.isArray(form[campo]) && form[campo].length === 0)) {
        nuevosErrores[campo] = true;
        mensajes[campo] = 'Este campo es obligatorio';
      }
    });

    // Validar fechas
    if (form.fechaInicio && form.fechaFin) {
      const fechaInicio = new Date(form.fechaInicio);
      const fechaFin = new Date(form.fechaFin);
      if (fechaInicio > fechaFin) {
        nuevosErrores.fechaFin = true;
        mensajes.fechaFin = 'La fecha final debe ser posterior a la fecha inicial';
      }
    }

    setErrores(nuevosErrores);
    setMensajesError(mensajes);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = () => {
    if (validar()) {
      // Aquí iría la lógica para generar el reporte
      console.log('Generando reporte:', form);
      onClose();
    }
  };

  const renderCamposAdicionales = () => {
    switch (form.tipoReporte) {
      case 'volumen_por_cliente':
        return (
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={clientesDisponibles}
              getOptionLabel={(option) => option.razonSocial}
              value={form.clientes}
              onChange={(_, newValue) => setForm(prev => ({ ...prev, clientes: newValue }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Clientes"
                  error={errores.clientes}
                  helperText={errores.clientes ? mensajesError.clientes : ''}
                />
              )}
            />
          </Grid>
        );

      case 'valor_por_tipo':
        return (
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={categoriasMercaderia}
              getOptionLabel={(option) => option.label}
              value={form.categoriasMercaderia}
              onChange={(_, newValue) => setForm(prev => ({ ...prev, categoriasMercaderia: newValue }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categorías de Mercadería"
                  error={errores.categoriasMercaderia}
                  helperText={errores.categoriasMercaderia ? mensajesError.categoriasMercaderia : ''}
                />
              )}
            />
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ border: '3px solid #0097a7', borderRadius: 3, m: 1, position: 'relative' }}>
        <DialogTitle sx={{ pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">Generar Reporte</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID del Reporte"
                value={form.idReporte}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={errores.tipoReporte}>
                <InputLabel>Tipo de Reporte</InputLabel>
                <Select
                  name="tipoReporte"
                  value={form.tipoReporte}
                  onChange={handleChange}
                  label="Tipo de Reporte"
                >
                  {tiposReporte.map((tipo) => (
                    <MenuItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </MenuItem>
                  ))}
                </Select>
                {errores.tipoReporte && (
                  <Typography color="error" variant="caption">
                    {mensajesError.tipoReporte}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha Inicio"
                name="fechaInicio"
                type="date"
                value={form.fechaInicio}
                onChange={handleChange}
                error={errores.fechaInicio}
                helperText={errores.fechaInicio ? mensajesError.fechaInicio : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha Fin"
                name="fechaFin"
                type="date"
                value={form.fechaFin}
                onChange={handleChange}
                error={errores.fechaFin}
                helperText={errores.fechaFin ? mensajesError.fechaFin : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {renderCamposAdicionales()}

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleGuardar}
                  sx={{
                    backgroundColor: '#8BAAAD',
                    '&:hover': {
                      backgroundColor: '#6B8A8D',
                    },
                  }}
                >
                  Generar Reporte
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default ModalReporte; 