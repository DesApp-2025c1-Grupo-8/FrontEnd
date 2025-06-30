import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector, useDispatch } from 'react-redux';
import { selectEstadosRemito } from '../redux/estadosRemito/estadosRemitoSlice';
import {
  agregarEstadoRemito,
  actualizarEstadoRemito,
  eliminarEstadoRemito
} from '../redux/estadosRemito/estadosRemitoSlice';

const estadosPosibles = [
  { value: "Activo", label: "Activo" },
  { value: "Inactivo", label: "Inactivo" },
];

const camposObligatorios = ["nombre", "estado"];

const camposIniciales = {
  nombre: "",
  descripcion: "",
  estado: "",
  color: "#607d8b", // Color por defecto
};

const PALETA_COLORES = [
  '#1976d2', // Azul
  '#43a047', // Verde
  '#e53935', // Rojo
  '#ff9800', // Naranja
  '#607d8b', // Gris
  '#8e24aa', // Violeta
  '#00897b', // Verde agua
  '#fbc02d', // Amarillo
];

function ModalEstadoRemito({
  open,
  onClose,
  modo = "alta",
  estadoRemito = null,
}) {
  const [form, setForm] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [mensajesError, setMensajesError] = useState({});
  const [modoInterno, setModoInterno] = useState(modo);

  const dispatch = useDispatch();
  // Obtener los estados existentes
  const estados = useSelector(selectEstadosRemito);
  // Excluir el color del estado actual si es edición
  const coloresUsados = estados
    .filter(e => e.id !== form.id)
    .map(e => e.color);

  useEffect(() => {
    if (modo === "alta") {
      setForm(camposIniciales);
      setModoInterno("alta");
    } else if (estadoRemito) {
      setForm({
        ...camposIniciales,
        ...estadoRemito,
        color: estadoRemito.color || "#607d8b"
      });
      setModoInterno(modo);
    }
    setErrores({});
    setMensajesError({});
  }, [open, modo, estadoRemito]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const mensajesError = {};

    camposObligatorios.forEach((campo) => {
      if (!form[campo] || form[campo].toString().trim() === "") {
        nuevosErrores[campo] = true;
        mensajesError[campo] = "Campo obligatorio";
      }
    });

    if (form.estado && !["Activo", "Inactivo"].includes(form.estado)) {
      nuevosErrores.estado = true;
      mensajesError.estado = 'Estado debe ser "Activo" o "Inactivo"';
    }

    setErrores(nuevosErrores);
    setMensajesError(mensajesError);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = () => {
    if (validar()) {
      if (modoInterno === "alta") {
        // NO enviar ID al crear nuevo estado - el backend lo asignará
        const { id, ...estadoSinId } = form;
        console.log("[ESTADOS] Guardando:", estadoSinId);
        dispatch(agregarEstadoRemito(estadoSinId));
      } else if (modoInterno === "modificacion") {
        console.log("[ESTADOS] Guardando:", form);
        dispatch(actualizarEstadoRemito(form));
      }
      onClose();
    }
  };

  const handleEditar = () => {
    setModoInterno("modificacion");
  };

  const handleEliminar = () => {
    if (form.id) {
      dispatch(eliminarEstadoRemito(form.id));
      onClose();
    }
  };

  const camposEditables =
    modoInterno === "alta" || modoInterno === "modificacion";

  const getTitulo = () => {
    if (modoInterno === "alta") return "Nuevo Estado de Remito";
    if (modoInterno === "modificacion") return "Editar Estado de Remito";
    return "Información Estado de Remito";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          border: "3px solid #0097a7",
          borderRadius: 3,
          m: 1,
          position: "relative",
        }}
      >
        <DialogTitle
          sx={{
            pb: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {getTitulo()}
          </Typography>
          <Box>
            {/* Solo mostrar botones de acción en modo consulta */}
            {modoInterno === "consulta" && (
              <>
                <Tooltip title="Editar">
                  <IconButton onClick={handleEditar}>
                    <EditIcon color="primary" />
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
          <Box
            sx={{ border: "1px solid #b2ebf2", borderRadius: 2, p: 2, mt: 2 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "#0097a7",
                fontWeight: "bold",
                mb: 2,
                borderBottom: "2px solid #b2ebf2",
              }}
            >
              Datos del Estado de Remito
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.nombre}
                    helperText={mensajesError.nombre}
                    size="small"
                  />
                  {errores.nombre && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              {/* Paleta de colores predefinidos */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Color
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {PALETA_COLORES.map((c) => {
                    const usado = coloresUsados.includes(c);
                    const seleccionado = form.color === c;
                    return (
                      <Box
                        key={c}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: c,
                          border: seleccionado ? '3px solid #000' : '1px solid #ccc',
                          cursor: !usado && camposEditables ? 'pointer' : 'not-allowed',
                          opacity: usado && !seleccionado ? 0.3 : 1,
                          transition: 'border 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                        onClick={() => !usado && camposEditables && setForm((prev) => ({ ...prev, color: c }))}
                      >
                        {seleccionado && (
                          <Box sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: '#fff',
                            border: '2px solid #000',
                          }} />
                        )}
                        {usado && !seleccionado && (
                          <Box
                            sx={{
                              position: 'absolute',
                              width: 24,
                              height: 2,
                              bgcolor: '#000',
                              borderRadius: 1,
                              transform: 'rotate(-45deg)',
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Descripción"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    minRows={3}
                    disabled={!camposEditables}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} sx={{width: '100%'}}>
                <Box display="flex" alignItems="center">
                  <TextField
                    select
                    label="Estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    fullWidth
                    disabled={!camposEditables}
                    error={!!errores.estado}
                    helperText={mensajesError.estado}
                    size="small"
                  >
                    {estadosPosibles.map((option) => (
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
            </Grid>
          </Box>

          {(modoInterno === "alta" || modoInterno === "modificacion") && (
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

export default ModalEstadoRemito;
