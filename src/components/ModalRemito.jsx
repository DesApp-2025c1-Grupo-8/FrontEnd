// Este componente maneja la creación, edición y visualización de remitos.
// Permite tres modos de operación: alta (crear nuevo remito), modificación (editar remito existente)
// y consulta (ver información del remito).

// Importaciones de React y hooks necesarios
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
  Checkbox,
  FormControlLabel,
  InputAdornment
} from '@mui/material';

// Importaciones de iconos de Material-UI
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

// Lista de estados posibles para un remito
const estadosRemito = [
  { value: 'autorizado', label: 'Autorizado' },
  { value: 'en preparacion', label: 'En preparación' },
  { value: 'en carga', label: 'En carga' },
  { value: 'en camino', label: 'En camino' },
  { value: 'no entregado', label: 'No entregado' },
  { value: 'entregado', label: 'Entregado' },
];

// Lista de categorías disponibles para clasificar los remitos
const categorias = [
  { value: 'metalurgica', label: 'Metalúrgica' },
  { value: 'electrica', label: 'Eléctrica' },
  { value: 'automotriz', label: 'Automotriz' },
];

// Lista de campos que son obligatorios en el formulario
const camposObligatorios = [
  'numeroRemito',
  'estado',
  'fechaEmision',
  'destino',
  'razonSocial',
  'cuit',
  'tipoCliente',
  'peso',
  'volumen',
  'valor',
  'categoria',
  'pallets',
  'racks',
  'bultos',
  'tambores',
  'bobinas'
];

// Valores iniciales para el formulario cuando se crea un nuevo remito
const camposIniciales = {
  numeroRemito: '',
  estado: 'autorizado',
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
  archivo: null,
  historial: [
    { estado: 'Autorizado', fecha: '15/5/2025' }
  ]
};

// Datos de ejemplo para pruebas de clientes
const clientesEjemplo = [
  {
    cuit: '30-71234567-8',
    razonSocial: 'Metalúrgica Argentina S.A.',
    tipoCliente: 'Empresa privada'
  },
  {
    cuit: '30-12345678-9',
    razonSocial: 'Ministerio de Transporte',
    tipoCliente: 'Organismo estatal'
  }
];

// Datos de ejemplo para pruebas de destinos
const destinosEjemplo = [
  {
    id: 1,
    nombre: 'Planta Industrial Norte',
    direccion: 'Calle Falsa, Km 25',
    ciudad: 'Rosario'
  },
  {
    id: 2,
    nombre: 'Centro Sur',
    direccion: 'Av. Falsa 1500',
    ciudad: 'Córdoba'
  }
];

// Componente principal ModalRemito
function ModalRemito({ open, onClose, modo = 'alta', remito = null }) {
  // Estados del componente
  const [form, setForm] = useState(camposIniciales); // Estado del formulario
  const [errores, setErrores] = useState({}); // Estado para manejar errores de validación
  const [mensajesError, setMensajesError] = useState({}); // Estado para mensajes de error
  const [modoInterno, setModoInterno] = useState(modo); // Estado para el modo de operación
  const [archivoNombre, setArchivoNombre] = useState(''); // Estado para el nombre del archivo adjunto
  const [sugerenciasCliente, setSugerenciasCliente] = useState([]); // Estado para sugerencias de clientes
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false); // Estado para mostrar sugerencias de clientes
  const [sugerenciasDestino, setSugerenciasDestino] = useState([]); // Estado para sugerencias de destinos
  const [mostrarSugerenciasDestino, setMostrarSugerenciasDestino] = useState(false); // Estado para mostrar sugerencias de destinos

  // Efecto para inicializar el formulario cuando cambia el modo o el remito
  useEffect(() => {
    if (modo === 'alta') {
      setForm(camposIniciales);
      setModoInterno('alta');
      setArchivoNombre('');
    } else if (remito) {
      setForm({ ...remito });
      setModoInterno(modo);
      setArchivoNombre(remito.archivo ? remito.archivo.name : '');
    }
    setErrores({});
  }, [open, modo, remito]);

  // Función para buscar clientes por CUIT
  const buscarCliente = (cuit) => {
    if (!cuit) {
      setSugerenciasCliente([]);
      setMostrarSugerencias(false);
      return;
    }

    const clientesEncontrados = clientesEjemplo.filter(cliente => 
      cliente.cuit.includes(cuit)
    );
    
    setSugerenciasCliente(clientesEncontrados);
    setMostrarSugerencias(true);
  };

  // Función para seleccionar un cliente de las sugerencias
  const seleccionarCliente = (cliente) => {
    setForm(prev => ({
      ...prev,
      cuit: cliente.cuit,
      razonSocial: cliente.razonSocial,
      tipoCliente: cliente.tipoCliente
    }));
    setMostrarSugerencias(false);
  };

  // Función para buscar destinos por nombre o ciudad
  const buscarDestino = (nombre) => {
    if (!nombre) {
      setSugerenciasDestino([]);
      setMostrarSugerenciasDestino(false);
      return;
    }

    const destinosEncontrados = destinosEjemplo.filter(destino => 
      destino.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
      destino.ciudad.toLowerCase().includes(nombre.toLowerCase())
    );
    
    setSugerenciasDestino(destinosEncontrados);
    setMostrarSugerenciasDestino(true);
  };

  // Función para seleccionar un destino de las sugerencias
  const seleccionarDestino = (destino) => {
    setForm(prev => ({
      ...prev,
      destino: destino.nombre
    }));
    setMostrarSugerenciasDestino(false);
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, archivo: files[0] }));
      setArchivoNombre(files[0]?.name || '');
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === 'cuit') {
        buscarCliente(value);
      }
      if (name === 'destino') {
        buscarDestino(value);
      }
    }
  };

  // Función para validar los campos del formulario
  const validar = () => {
    const nuevosErrores = {};
    const mensajesError = {};
    
    // Validación de campos obligatorios
    camposObligatorios.forEach((campo) => {
      if (!form[campo] || form[campo].toString().trim() === '') {
        nuevosErrores[campo] = true;
        if (campo === 'categoria') {
          mensajesError[campo] = 'Debe seleccionar una categoría';
        }
      }
    });

    // Validación de formato de número de remito
    if (form.numeroRemito && !/^\d+$/.test(form.numeroRemito)) {
      nuevosErrores.numeroRemito = true;
      mensajesError.numeroRemito = 'Debe ser un número';
    }

    // Validación de formato de CUIT/RUT
    if (form.cuit && !/^\d{2}-\d{8}-\d{1}$/.test(form.cuit) && !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(form.cuit)) {
      nuevosErrores.cuit = true;
      mensajesError.cuit = 'El CUIT debe tener formato XX-XXXXXXXX-X o el RUT formato XX.XXX.XXX-X';
    }

    // Validación de campos numéricos
    if (form.peso && !/^\d+(\.\d+)?$/.test(form.peso)) {
      nuevosErrores.peso = true;
      mensajesError.peso = 'El peso debe ser un número válido';
    }
    if (form.volumen && !/^\d+(\.\d+)?$/.test(form.volumen)) {
      nuevosErrores.volumen = true;
      mensajesError.volumen = 'El volumen debe ser un número válido';
    }
    if (form.valor && !/^\d+(\.\d+)?$/.test(form.valor)) {
      nuevosErrores.valor = true;
      mensajesError.valor = 'El valor debe ser un número válido';
    }

    // Validación de campos de cantidades
    const camposNumericos = ['pallets', 'racks', 'bultos', 'tambores', 'bobinas'];
    camposNumericos.forEach(campo => {
      if (form[campo] && !/^\d+$/.test(form[campo])) {
        nuevosErrores[campo] = true;
        mensajesError[campo] = 'Debe ser un número entero válido';
      }
    });

    setErrores(nuevosErrores);
    setMensajesError(mensajesError);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para guardar el remito
  const handleGuardar = () => {
    validar();
  };

  // Función para cambiar al modo de edición
  const handleEditar = () => {
    setModoInterno('modificacion');
  };

  // Función para eliminar el remito (solo visual)
  const handleEliminar = () => {
    // Solo visual
  };

  // Variable para determinar si los campos son editables
  const camposEditables = modoInterno === 'alta' || modoInterno === 'modificacion';

  // Función para obtener el título del modal según el modo
  const getTitulo = () => {
    if (modoInterno === 'alta') return 'Nuevo Remito';
    if (modoInterno === 'modificacion') return 'Editar Remito';
    return 'Información del Remito';
  };

  return (
    // Contenedor principal del modal con borde y bordes redondeados
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ border: '3px solid #0097a7', borderRadius: 3, m: 1, position: 'relative' }}>
        {/* Encabezado del modal con título y botones de acción */}
        <DialogTitle sx={{ pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">{getTitulo()}</Typography>
          <Box>
            {/* Botones de acción que solo se muestran en modo consulta */}
            {modoInterno === 'consulta' && (
              <>
                <Tooltip title="Editar">
                  <IconButton onClick={handleEditar}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Descargar">
                  <IconButton>
                    <DownloadIcon color="primary" />
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

        {/* Contenido principal del modal */}
        <DialogContent>
          {/* Sección de datos principales del remito */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2, mt: 3 }}>
            {/* Campo de número de remito */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Número de remito"
                  name="numeroRemito"
                  value={form.numeroRemito}
                  onChange={handleChange}
                  fullWidth
                  disabled={modoInterno !== 'alta'}
                  error={!!errores.numeroRemito}
                  helperText={mensajesError.numeroRemito}
                  size="small"
                  InputProps={{
                    readOnly: modoInterno !== 'alta',
                  }}
                />
                {errores.numeroRemito && (
                  <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                )}
              </Box>
            </Grid>

            {/* Campo de estado actual */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  label="Estado actual"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.estado}
                  helperText={mensajesError.estado}
                  size="small"
                >
                  {estadosRemito.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {errores.estado && (
                  <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                )}
              </Box>
            </Grid>

            {/* Campo de fecha de emisión */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Fecha de emisión"
                  name="fechaEmision"
                  type="date"
                  value={form.fechaEmision}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  error={!!errores.fechaEmision}
                  helperText={mensajesError.fechaEmision}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                {errores.fechaEmision && (
                  <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                )}
              </Box>
            </Grid>

            {/* Campo de destino con búsqueda */}
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Destino"
                    name="destino"
                    value={form.destino}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.destino}
                    helperText={mensajesError.destino}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errores.destino && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
                {/* Lista de sugerencias de destinos */}
                {mostrarSugerenciasDestino && sugerenciasDestino.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 1,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      borderRadius: 1,
                      mt: 0.5,
                      maxHeight: 200,
                      overflow: 'auto'
                    }}
                  >
                    {sugerenciasDestino.map((destino, index) => (
                      <Box
                        key={index}
                        onClick={() => seleccionarDestino(destino)}
                        sx={{
                          p: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'action.hover'
                          }
                        }}
                      >
                        <Typography variant="body2">
                          {destino.nombre} - {destino.ciudad}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Sección de información del cliente */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información del cliente
            </Typography>
            <Grid container spacing={2} alignItems="center">
              {/* Campo de razón social */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Razón Social"
                    name="razonSocial"
                    value={form.razonSocial}
                    fullWidth
                    disabled={true}
                    error={!!errores.razonSocial}
                    helperText={mensajesError.razonSocial}
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {errores.razonSocial && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>

              {/* Campo de CUIT/RUT con búsqueda */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errores.cuit && (
                      <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                    )}
                  </Box>
                  {/* Lista de sugerencias de clientes */}
                  {mostrarSugerencias && sugerenciasCliente.length > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 1,
                        mt: 0.5,
                        maxHeight: 200,
                        overflow: 'auto'
                      }}
                    >
                      {sugerenciasCliente.map((cliente, index) => (
                        <Box
                          key={index}
                          onClick={() => seleccionarCliente(cliente)}
                          sx={{
                            p: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <Typography variant="body2">
                            {cliente.cuit} - {cliente.razonSocial}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Campo de tipo de cliente */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Tipo de Cliente"
                    name="tipoCliente"
                    value={form.tipoCliente}
                    fullWidth
                    disabled={true}
                    error={!!errores.tipoCliente}
                    helperText={mensajesError.tipoCliente}
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {errores.tipoCliente && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Sección de datos de mercadería */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Datos de mercadería
            </Typography>
            <Grid container spacing={2} alignItems="center">
              {/* Campos de peso, volumen y valor */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>
                    }}
                  />
                  {errores.peso && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    InputProps={{
                      endAdornment: <InputAdornment position="end">m³</InputAdornment>
                    }}
                  />
                  {errores.volumen && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ARS</InputAdornment>
                    }}
                  />
                  {errores.valor && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>

              {/* Campo de categoría */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    select
                    label="Categoría"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    size="small"
                    sx={{ minWidth: 220 }}
                    error={!!errores.categoria}
                    helperText={mensajesError.categoria}
                  >
                    {categorias.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errores.categoria && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>

              {/* Sección de cantidades */}
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                  Cantidades:
                </Typography>
                <Grid container spacing={1}>
                  {/* Campos de cantidades (pallets, racks, bultos, etc.) */}
                  <Grid item xs={6} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      />
                      {errores.pallets && (
                        <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      />
                      {errores.racks && (
                        <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      />
                      {errores.bultos && (
                        <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      />
                      {errores.tambores && (
                        <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      />
                      {errores.bobinas && (
                        <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </Grid>
                </Grid>
                {/* Checkbox de refrigeración */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.requiereRefrigeracion}
                      onChange={handleChange}
                      name="requiereRefrigeracion"
                      disabled={!camposEditables}
                    />
                  }
                  label="Requiere refrigeración"
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Sección de información adicional */}
          <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
              Información adicional
            </Typography>
            <Grid container spacing={2} alignItems="center">
              {/* Campo de observaciones */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Campo de observación..."
                  name="observaciones"
                  value={form.observaciones}
                  onChange={handleChange}
                  fullWidth
                  disabled={!camposEditables}
                  size="small"
                  multiline
                  minRows={2}
                />
              </Grid>
              {/* Botón para adjuntar documento */}
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  disabled={!camposEditables}
                  sx={{ mr: 2 }}
                >
                  ADJUNTAR DOCUMENTO
                </Button>
                <span>Ningún archivo seleccionado</span>
              </Grid>
            </Grid>
          </Box>

          {/* Sección de historial de estados (solo visible en modo consulta o modificación) */}
          {modoInterno !== 'alta' && (
            <Box sx={{ border: '1px solid #b2ebf2', borderRadius: 2, p: 2, mb: 2, bgcolor: '#fff' }}>
              <Typography variant="subtitle1" sx={{ color: '#0097a7', fontWeight: 'bold', mb: 2, borderBottom: '2px solid #b2ebf2' }}>
                Historial de estados
              </Typography>
              <Grid container>
                {/* Columna de estados */}
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0097a7' }}>Estado</Typography>
                  {form.historial.map((h, idx) => (
                    <Typography key={idx} sx={{ mb: 1 }}>{h.estado}</Typography>
                  ))}
                </Grid>
                {/* Columna de fechas */}
                <Grid item xs={6} sx={{ pl: { xs: 2, sm: 4 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0097a7' }}>Fecha</Typography>
                  {form.historial.map((h, idx) => (
                    <Typography key={idx} sx={{ mb: 1 }}>{h.fecha}</Typography>
                  ))}
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Botón de guardar (solo visible en modo alta o modificación) */}
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

export default ModalRemito; 