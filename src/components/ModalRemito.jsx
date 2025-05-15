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
  Checkbox,
  FormControlLabel,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const estadosRemito = [
  { value: 'retenido', label: 'Retenido' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_preparacion', label: 'En preparación' },
  { value: 'en_transito', label: 'En tránsito' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const categorias = [
  { value: 'metalurgica', label: 'Metalúrgica' },
  { value: 'quimica', label: 'Química' },
  { value: 'alimentos', label: 'Alimentos' },
];

const tiposCliente = [
  { value: 'empresa privada', label: 'Empresa Privada' },
  { value: 'organismo estatal', label: 'Organismo Estatal' },
  { value: 'particular', label: 'Particular' },
];

const camposObligatorios = [
  'numeroRemito',
  'estado', 'fechaEmision', 'destino',
  'razonSocial', 'cuit', 'tipoCliente',
  'peso', 'volumen', 'valor', 'categoria',
  'pallets', 'racks', 'bultos', 'tambores', 'bobinas'
];

const camposIniciales = {
  numeroRemito: '',
  estado: '',
  fechaEmision: '',
  destino: '',
  razonSocial: '',
  cuit: '',
  tipoCliente: '',
  peso: '',
  volumen: '',
  valor: '',
  categoria: '',
  pallets: '',
  racks: '',
  bultos: '',
  tambores: '',
  bobinas: '',
  requiereRefrigeracion: false,
  observaciones: '',
  documentacion: '',
};

// Lista simulada de clientes
const clientesSimulados = [
  { cuit: '20-12345678-9', razonSocial: 'Empresa Uno S.A.', tipoCliente: 'empresa privada' },
  { cuit: '27-87654321-0', razonSocial: 'Organismo Estatal X', tipoCliente: 'organismo estatal' }
];

function ModalRemito({ open, onClose, modo = 'alta', remito = null }) {
  const [form, setForm] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [mensajesError, setMensajesError] = useState({});
  const [modoInterno, setModoInterno] = useState(modo);
  const [intentoGuardar, setIntentoGuardar] = useState(false);

  useEffect(() => {
    if (modo === 'alta') {
      setForm({
        ...camposIniciales,
        estado: 'autorizado'
      });
      setModoInterno('alta');
      setIntentoGuardar(false);
    } else if (remito) {
      setForm({
        ...remito,
        numeroRemito: '12345',
        cuit: clientesSimulados[0].cuit,
        razonSocial: clientesSimulados[0].razonSocial,
        tipoCliente: clientesSimulados[0].tipoCliente
      });
      setModoInterno(modo);
      setIntentoGuardar(false);
    }
    setErrores({});
  }, [open, modo, remito]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const mensajes = {};
    camposObligatorios.forEach((campo) => {
      if (!form[campo] || form[campo].toString().trim() === '') {
        nuevosErrores[campo] = true;
      }
    });
    if (
      form.cuit &&
      !/^\d{2}-\d{8}-\d{1}$/.test(form.cuit) &&
      !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(form.cuit)
    ) {
      nuevosErrores.cuit = true;
      mensajes.cuit = 'El CUIT debe tener formato XX-XXXXXXXX-X o el RUT formato XX.XXX.XXX-X';
    }
    if (form.valor && isNaN(Number(form.valor.toString().replace(/\./g, '').replace(',', '.')))) {
      nuevosErrores.valor = true;
      mensajes.valor = 'El valor debe ser numérico';
    }
    if (form.peso && isNaN(Number(form.peso))) {
      nuevosErrores.peso = true;
      mensajes.peso = 'El peso debe ser numérico';
    }
    if (form.volumen && isNaN(Number(form.volumen))) {
      nuevosErrores.volumen = true;
      mensajes.volumen = 'El volumen debe ser numérico';
    }
    ['pallets', 'racks', 'bultos', 'tambores', 'bobinas'].forEach((campo) => {
      if (form[campo] && isNaN(Number(form[campo]))) {
        nuevosErrores[campo] = true;
        mensajes[campo] = 'Debe ser un número';
      }
      if (form[campo] && Number(form[campo]) < 0) {
        nuevosErrores[campo] = true;
        mensajes[campo] = 'No puede ser un número negativo';
      }
    });
    if (form.numeroRemito && isNaN(Number(form.numeroRemito))) {
      nuevosErrores.numeroRemito = true;
      mensajes.numeroRemito = 'Debe ser un número';
    }
    setErrores(nuevosErrores);
    setMensajesError(mensajes);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = () => {
    setIntentoGuardar(true);
    validar();
  };

  const handleEditar = () => {
    setModoInterno('modificacion');
  };

  const handleEliminar = () => {
    // Solo visual
  };

  const camposEditables = modoInterno === 'alta' || modoInterno === 'modificacion';

  const getTitulo = () => {
    if (modoInterno === 'alta') return 'Nuevo Remito';
    if (modoInterno === 'modificacion') return 'Editar Remito Nº 12345';
    return 'Detalle de Remito Nº 12345';
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
                <Tooltip title="Descargar">
                  <IconButton>
                    <CloudDownloadIcon color="primary" />
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Número de remito"
                  name="numeroRemito"
                  value={form.numeroRemito}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.numeroRemito}
                  helperText={mensajesError.numeroRemito}
                  size="small"
                  sx={{ mb: 2 }}
                />
                {errores.numeroRemito && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <TextField
                  select
                  label="Estado actual"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.estado}
                  size="small"
                  sx={{ 
                    mb: 2,
                    minWidth: '200px'
                  }}
                >
                  {modoInterno === 'alta' && (
                    <MenuItem value="" disabled>
                      Estado actual
                    </MenuItem>
                  )}
                  {estadosRemito.map((op) => (
                    <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                  ))}
                </TextField>
                {errores.estado && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Fecha de emisión"
                  name="fechaEmision"
                  type="date"
                  value={form.fechaEmision}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.fechaEmision}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                {errores.fechaEmision && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Destino"
                  name="destino"
                  value={form.destino}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.destino}
                  size="small"
                  sx={{ mb: 2 }}
                />
                {errores.destino && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
              </Box>
            </Grid>
          </Grid>

          {/* Información del cliente */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información del cliente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Razón Social"
                    name="razonSocial"
                    value={form.razonSocial}
                    onChange={handleChange}
                    fullWidth
                    disabled
                    error={!!errores.razonSocial}
                    size="small"
                    sx={{
                      mb: 2,
                      ...(!!errores.razonSocial && {
                        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d32f2f',
                        },
                        '& label.Mui-disabled': {
                          color: '#d32f2f',
                        }
                      })
                    }}
                  />
                  {errores.razonSocial && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box display="flex" alignItems="center">
                  <Autocomplete
                    options={clientesSimulados}
                    getOptionLabel={(option) => option.cuit}
                    isOptionEqualToValue={(option, value) => option.cuit === value.cuit}
                    filterOptions={(options, { inputValue }) => {
                      const normalize = (str) => str.replace(/[-.]/g, '').toLowerCase();
                      return options.filter(opt => normalize(opt.cuit).includes(normalize(inputValue)));
                    }}
                    value={clientesSimulados.find(c => c.cuit === form.cuit) || null}
                    onChange={(_, value) => {
                      if (value) {
                        setForm((prev) => ({
                          ...prev,
                          cuit: value.cuit,
                          razonSocial: value.razonSocial,
                          tipoCliente: value.tipoCliente
                        }));
                      } else {
                        setForm((prev) => ({ ...prev, cuit: '', razonSocial: '', tipoCliente: '' }));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="CUIT/RUT"
                        error={
                          (intentoGuardar && (!form.cuit || !!errores.cuit)) ||
                          (!!form.cuit && !!errores.cuit)
                        }
                        helperText={
                          (intentoGuardar && (!form.cuit || !!errores.cuit)) || (!!form.cuit && !!errores.cuit)
                            ? mensajesError.cuit
                            : ''
                        }
                        size="small"
                        sx={{ 
                          mb: 2,
                          '& .MuiAutocomplete-input': {
                            width: '100% !important'
                          }
                        }}
                        fullWidth
                        disabled={!camposEditables}
                      />
                    )}
                    disabled={!camposEditables}
                    sx={{ width: '100%' }}
                  />
                  {((intentoGuardar && (!form.cuit || !!errores.cuit)) || (!!form.cuit && !!errores.cuit)) && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Tipo de Cliente"
                    name="tipoCliente"
                    value={form.tipoCliente}
                    fullWidth
                    disabled
                    error={!!errores.tipoCliente}
                    size="small"
                    sx={{
                      mb: 2,
                      ...(!!errores.tipoCliente && {
                        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d32f2f',
                        },
                        '& label.Mui-disabled': {
                          color: '#d32f2f',
                        }
                      })
                    }}
                  />
                  {errores.tipoCliente && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Datos de mercadería */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Datos de mercadería
            </Typography>
            <Grid container spacing={2}>
              {/* Fila de campos principales */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Peso (kg)"
                        name="peso"
                        value={form.peso}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        error={!!errores.peso}
                        helperText={mensajesError.peso}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      {errores.peso && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Volumen (m³)"
                        name="volumen"
                        value={form.volumen}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        error={!!errores.volumen}
                        helperText={mensajesError.volumen}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      {errores.volumen && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Valor (ARS)"
                        name="valor"
                        value={form.valor}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        error={!!errores.valor}
                        helperText={mensajesError.valor}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      {errores.valor && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        select
                        label="Categoría"
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        error={!!errores.categoria}
                        size="small"
                        sx={{ 
                          mb: 2,
                          minWidth: '200px'
                        }}
                      >
                        {modoInterno === 'alta' && (
                          <MenuItem value="" disabled>
                            Categoría
                          </MenuItem>
                        )}
                        {categorias.map((op) => (
                          <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                        ))}
                      </TextField>
                      {errores.categoria && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              {/* Fila de Contenido específico */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Cantidades:
                </Typography>
              </Grid>
              {/* Fila de campos de contenido específico */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Pallets"
                        name="pallets"
                        value={form.pallets}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        size="small"
                        error={!!errores.pallets}
                        helperText={mensajesError.pallets}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ required: false }}
                      />
                      {errores.pallets && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Racks"
                        name="racks"
                        value={form.racks}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        size="small"
                        error={!!errores.racks}
                        helperText={mensajesError.racks}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ required: false }}
                      />
                      {errores.racks && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Bultos"
                        name="bultos"
                        value={form.bultos}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        size="small"
                        error={!!errores.bultos}
                        helperText={mensajesError.bultos}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ required: false }}
                      />
                      {errores.bultos && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Tambores"
                        name="tambores"
                        value={form.tambores}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        size="small"
                        error={!!errores.tambores}
                        helperText={mensajesError.tambores}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ required: false }}
                      />
                      {errores.tambores && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="Bobinas"
                        name="bobinas"
                        value={form.bobinas}
                        onChange={handleChange}
                        fullWidth
                        disabled={!camposEditables}
                        size="small"
                        error={!!errores.bobinas}
                        helperText={mensajesError.bobinas}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ required: false }}
                      />
                      {errores.bobinas && <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={2} display="flex" alignItems="center">
                <FormControlLabel
                  control={<Checkbox checked={form.requiereRefrigeracion} onChange={handleChange} name="requiereRefrigeracion" disabled={!camposEditables} />}
                  label="Requiere refrigeración"
                  sx={{ ml: 1 }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Información adicional */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información adicional
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Campo de observaciones"
                  name="observaciones"
                  value={form.observaciones}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={3}
                  disabled={!camposEditables}
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    sx={{ mb: 2, flexShrink: 0 }}
                    disabled={!camposEditables}
                    color={errores.documentacion ? 'error' : 'primary'}
                    startIcon={<CloudDownloadIcon />}
                  >
                    Adjuntar documento
                  </Button>
                  <Box sx={{ ml: 2, flexGrow: 1, color: errores.documentacion ? '#d32f2f' : 'inherit', fontSize: 15 }}>
                    Ningún archivo seleccionado
                  </Box>
                  {errores.documentacion && <ErrorOutlineIcon color="error" sx={{ ml: 1, fontSize: 28 }} />}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Historial de estados */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mt: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Historial de estados
            </Typography>
            <Box>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 4, color: '#0097a7' }}>Estado</th>
                    <th style={{ textAlign: 'left', padding: 4, color: '#0097a7' }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: 4 }}>Autorizado</td>
                    <td style={{ padding: 4 }}>
                      {remito && remito.fechaCreacion
                        ? remito.fechaCreacion
                        : new Date().toLocaleDateString()}
                    </td>
                  </tr>
                  {(remito && remito.historialEstados && remito.historialEstados.length > 0)
                    ? remito.historialEstados.map((h, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: 4 }}>{h.estado}</td>
                          <td style={{ padding: 4 }}>{h.fecha}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </Box>
          </Box>

          {/* Botón Guardar solo en alta o modificación */}
          {(modoInterno === 'alta' || modoInterno === 'modificacion') && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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

export default ModalRemito; 