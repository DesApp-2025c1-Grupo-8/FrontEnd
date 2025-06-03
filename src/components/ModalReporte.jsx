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

// Tipos de reportes disponibles con sus etiquetas
const tiposReporte = [
  { value: 'volumen_por_cliente', label: 'Volumen total de mercadería por cliente/período' },
  { value: 'distribucion_geografica', label: 'Distribución geográfica de orígenes y destinos' },
  { value: 'valor_por_tipo', label: 'Análisis de valor declarado por tipo de mercadería' }
];

// Categorías de mercadería disponibles para los reportes
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

// Tipos de cliente disponibles para los reportes
const tiposCliente = [
  { value: 'empresa_privada', label: 'Empresa Privada' },
  { value: 'organismo_estatal', label: 'Organismo Estatal' },
  { value: 'particular', label: 'Particular' }
];

// Estados posibles de un remito
const estadosRemito = [
  { value: 'retenido', label: 'Retenido' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_preparacion', label: 'En Preparación' },
  { value: 'en_transito', label: 'En Tránsito' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' }
];

/**
 * Componente ModalReporte
 * @param {boolean} open - Controla la visibilidad del modal
 * @param {function} onClose - Función para cerrar el modal
 */
function ModalReporte({ open, onClose }) {
  // Estado inicial del formulario
  const [form, setForm] = useState({
    idReporte: generarIdReporte(),
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: '',
    clientes: [],
    categoriasMercaderia: [],
    // Campos para distribución geográfica
    origen: {
      pais: '',
      provincia: '',
      municipio: '',
      localidad: ''
    },
    destino: {
      pais: '',
      provincia: '',
      municipio: '',
      localidad: ''
    },
    cliente: null,
    tipoCliente: '',
    estadoRemito: ''
  });

  // Estado para manejar errores de validación
  const [errores, setErrores] = useState({});
  const [mensajesError, setMensajesError] = useState({});
  const [clientesDisponibles, setClientesDisponibles] = useState([]); // Se cargaría desde Redux

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (open) {
      setForm({
        idReporte: generarIdReporte(),
        tipoReporte: '',
        fechaInicio: '',
        fechaFin: '',
        clientes: [],
        categoriasMercaderia: [],
        origen: {
          pais: '',
          provincia: '',
          municipio: '',
          localidad: ''
        },
        destino: {
          pais: '',
          provincia: '',
          municipio: '',
          localidad: ''
        },
        cliente: null,
        tipoCliente: '',
        estadoRemito: ''
      });
      setErrores({});
    }
  }, [open]);

  // Manejador de cambios en campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador de cambios en campos de ubicación (origen/destino)
  const handleUbicacionChange = (tipo, campo, value) => {
    setForm(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: value
      }
    }));
  };

  /**
   * Función de validación del formulario
   * Valida campos comunes y específicos según el tipo de reporte
   * @returns {boolean} - true si el formulario es válido
   */
  const validar = () => {
    const nuevosErrores = {};
    const mensajes = {};

    // Validar campos comunes obligatorios
    if (!form.tipoReporte) {
      nuevosErrores.tipoReporte = true;
      mensajes.tipoReporte = 'El tipo de reporte es obligatorio';
    }

    if (!form.fechaInicio) {
      nuevosErrores.fechaInicio = true;
      mensajes.fechaInicio = 'La fecha de inicio es obligatoria';
    }

    if (!form.fechaFin) {
      nuevosErrores.fechaFin = true;
      mensajes.fechaFin = 'La fecha de fin es obligatoria';
    }

    if (!form.estadoRemito) {
      nuevosErrores.estadoRemito = true;
      mensajes.estadoRemito = 'El estado del remito es obligatorio';
    }

    // Validar campos según el tipo de reporte
    switch (form.tipoReporte) {
      case 'volumen_por_cliente':
        if (!form.cliente) {
          nuevosErrores.cliente = true;
          mensajes.cliente = 'El cliente es obligatorio';
        }
        if (!form.tipoCliente) {
          nuevosErrores.tipoCliente = true;
          mensajes.tipoCliente = 'El tipo de cliente es obligatorio';
        }
        if (!form.categoriasMercaderia || form.categoriasMercaderia.length === 0) {
          nuevosErrores.categoriasMercaderia = true;
          mensajes.categoriasMercaderia = 'Debe seleccionar al menos una categoría';
        }
        if (!form.peso) {
          nuevosErrores.peso = true;
          mensajes.peso = 'El peso es obligatorio';
        }
        if (!form.volumen) {
          nuevosErrores.volumen = true;
          mensajes.volumen = 'El volumen es obligatorio';
        }
        break;

      case 'distribucion_geografica':
        if (!form.cliente) {
          nuevosErrores.cliente = true;
          mensajes.cliente = 'El cliente es obligatorio';
        }
        if (!form.tipoCliente) {
          nuevosErrores.tipoCliente = true;
          mensajes.tipoCliente = 'El tipo de cliente es obligatorio';
        }
        if (!form.origen.pais || !form.origen.provincia || !form.origen.municipio || !form.origen.localidad) {
          nuevosErrores.origen = true;
          mensajes.origen = 'Todos los campos de origen son obligatorios';
        }
        if (!form.destino.pais || !form.destino.provincia || !form.destino.municipio || !form.destino.localidad) {
          nuevosErrores.destino = true;
          mensajes.destino = 'Todos los campos de destino son obligatorios';
        }
        break;

      case 'valor_por_tipo':
        if (!form.cliente) {
          nuevosErrores.cliente = true;
          mensajes.cliente = 'El cliente es obligatorio';
        }
        if (!form.tipoCliente) {
          nuevosErrores.tipoCliente = true;
          mensajes.tipoCliente = 'El tipo de cliente es obligatorio';
        }
        if (!form.categoriasMercaderia || form.categoriasMercaderia.length === 0) {
          nuevosErrores.categoriasMercaderia = true;
          mensajes.categoriasMercaderia = 'Debe seleccionar al menos una categoría';
        }
        if (!form.valorMinimo) {
          nuevosErrores.valorMinimo = true;
          mensajes.valorMinimo = 'El valor mínimo es obligatorio';
        }
        if (!form.valorMaximo) {
          nuevosErrores.valorMaximo = true;
          mensajes.valorMaximo = 'El valor máximo es obligatorio';
        }
        break;
    }

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

  // Manejador para guardar el reporte
  const handleGuardar = () => {
    if (validar()) {
      // Aquí iría la lógica para generar el reporte
      console.log('Generando reporte:', form);
      onClose();
    }
  };

  /**
   * Renderiza los campos adicionales según el tipo de reporte seleccionado
   * @returns {JSX.Element} - Campos específicos del tipo de reporte
   */
  const renderCamposAdicionales = () => {
    switch (form.tipoReporte) {
      case 'volumen_por_cliente':
        return (
          <>
            <Grid container spacing={2}>
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

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={errores.estadoRemito} sx={{ minWidth: '300px' }}>
                  <InputLabel>Estado de Remito</InputLabel>
                  <Select
                    name="estadoRemito"
                    value={form.estadoRemito}
                    onChange={handleChange}
                    label="Estado de Remito"
                  >
                    {estadosRemito.map((estado) => (
                      <MenuItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.estadoRemito && (
                    <Typography color="error" variant="caption">
                      {mensajesError.estadoRemito}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Información de Mercadería
              </Typography>
              <Grid container spacing={2}>
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
                        sx={{ minWidth: '300px' }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Peso (kg)"
                    name="peso"
                    type="number"
                    value={form.peso || ''}
                    onChange={handleChange}
                    error={errores.peso}
                    helperText={errores.peso ? mensajesError.peso : ''}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Volumen (m³)"
                    name="volumen"
                    type="number"
                    value={form.volumen || ''}
                    onChange={handleChange}
                    error={errores.volumen}
                    helperText={errores.volumen ? mensajesError.volumen : ''}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Información del Cliente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={clientesDisponibles}
                    getOptionLabel={(option) => option.razonSocial}
                    value={form.cliente}
                    onChange={(_, newValue) => setForm(prev => ({ ...prev, cliente: newValue }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        error={errores.cliente}
                        helperText={errores.cliente ? mensajesError.cliente : ''}
                        sx={{ minWidth: '300px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errores.tipoCliente} sx={{ minWidth: '300px' }}>
                    <InputLabel>Tipo de Cliente</InputLabel>
                    <Select
                      name="tipoCliente"
                      value={form.tipoCliente}
                      onChange={handleChange}
                      label="Tipo de Cliente"
                    >
                      {tiposCliente.map((tipo) => (
                        <MenuItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.tipoCliente && (
                      <Typography color="error" variant="caption">
                        {mensajesError.tipoCliente}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </>
        );

      case 'distribucion_geografica':
        return (
          <>
            <Grid item xs={12}>
              <FormControl fullWidth error={errores.estadoRemito} sx={{ minWidth: '300px' }}>
                <InputLabel>Estado de Remito</InputLabel>
                <Select
                  name="estadoRemito"
                  value={form.estadoRemito}
                  onChange={handleChange}
                  label="Estado de Remito"
                >
                  {estadosRemito.map((estado) => (
                    <MenuItem key={estado.value} value={estado.value}>
                      {estado.label}
                    </MenuItem>
                  ))}
                </Select>
                {errores.estadoRemito && (
                  <Typography color="error" variant="caption">
                    {mensajesError.estadoRemito}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Origen
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="País"
                    value={form.origen.pais}
                    onChange={(e) => handleUbicacionChange('origen', 'pais', e.target.value)}
                    error={errores.origen}
                    helperText={errores.origen ? mensajesError.origen : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Provincia"
                    value={form.origen.provincia}
                    onChange={(e) => handleUbicacionChange('origen', 'provincia', e.target.value)}
                    error={errores.origen}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Municipio"
                    value={form.origen.municipio}
                    onChange={(e) => handleUbicacionChange('origen', 'municipio', e.target.value)}
                    error={errores.origen}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Localidad"
                    value={form.origen.localidad}
                    onChange={(e) => handleUbicacionChange('origen', 'localidad', e.target.value)}
                    error={errores.origen}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Destino
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="País"
                    value={form.destino.pais}
                    onChange={(e) => handleUbicacionChange('destino', 'pais', e.target.value)}
                    error={errores.destino}
                    helperText={errores.destino ? mensajesError.destino : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Provincia"
                    value={form.destino.provincia}
                    onChange={(e) => handleUbicacionChange('destino', 'provincia', e.target.value)}
                    error={errores.destino}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Municipio"
                    value={form.destino.municipio}
                    onChange={(e) => handleUbicacionChange('destino', 'municipio', e.target.value)}
                    error={errores.destino}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Localidad"
                    value={form.destino.localidad}
                    onChange={(e) => handleUbicacionChange('destino', 'localidad', e.target.value)}
                    error={errores.destino}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Información del Cliente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={clientesDisponibles}
                    getOptionLabel={(option) => option.razonSocial}
                    value={form.cliente}
                    onChange={(_, newValue) => setForm(prev => ({ ...prev, cliente: newValue }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        error={errores.cliente}
                        helperText={errores.cliente ? mensajesError.cliente : ''}
                        sx={{ minWidth: '300px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errores.tipoCliente} sx={{ minWidth: '300px' }}>
                    <InputLabel>Tipo de Cliente</InputLabel>
                    <Select
                      name="tipoCliente"
                      value={form.tipoCliente}
                      onChange={handleChange}
                      label="Tipo de Cliente"
                    >
                      {tiposCliente.map((tipo) => (
                        <MenuItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.tipoCliente && (
                      <Typography color="error" variant="caption">
                        {mensajesError.tipoCliente}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </>
        );

      case 'valor_por_tipo':
        return (
          <>
            <Grid container spacing={2}>
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

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={errores.estadoRemito} sx={{ minWidth: '300px' }}>
                  <InputLabel>Estado de Remito</InputLabel>
                  <Select
                    name="estadoRemito"
                    value={form.estadoRemito}
                    onChange={handleChange}
                    label="Estado de Remito"
                  >
                    {estadosRemito.map((estado) => (
                      <MenuItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.estadoRemito && (
                    <Typography color="error" variant="caption">
                      {mensajesError.estadoRemito}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Información de Mercadería
              </Typography>
              <Grid container spacing={2}>
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
                        sx={{ minWidth: '300px' }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Valor Mínimo"
                    name="valorMinimo"
                    type="number"
                    value={form.valorMinimo || ''}
                    onChange={handleChange}
                    error={errores.valorMinimo}
                    helperText={errores.valorMinimo ? mensajesError.valorMinimo : ''}
                    InputProps={{
                      startAdornment: <Typography>$</Typography>,
                    }}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Valor Máximo"
                    name="valorMaximo"
                    type="number"
                    value={form.valorMaximo || ''}
                    onChange={handleChange}
                    error={errores.valorMaximo}
                    helperText={errores.valorMaximo ? mensajesError.valorMaximo : ''}
                    InputProps={{
                      startAdornment: <Typography>$</Typography>,
                    }}
                    sx={{ minWidth: '300px' }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Información del Cliente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={clientesDisponibles}
                    getOptionLabel={(option) => option.razonSocial}
                    value={form.cliente}
                    onChange={(_, newValue) => setForm(prev => ({ ...prev, cliente: newValue }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        error={errores.cliente}
                        helperText={errores.cliente ? mensajesError.cliente : ''}
                        sx={{ minWidth: '300px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errores.tipoCliente} sx={{ minWidth: '300px' }}>
                    <InputLabel>Tipo de Cliente</InputLabel>
                    <Select
                      name="tipoCliente"
                      value={form.tipoCliente}
                      onChange={handleChange}
                      label="Tipo de Cliente"
                    >
                      {tiposCliente.map((tipo) => (
                        <MenuItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.tipoCliente && (
                      <Typography color="error" variant="caption">
                        {mensajesError.tipoCliente}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </>
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
              <FormControl fullWidth error={errores.tipoReporte} sx={{ minWidth: '300px' }}>
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