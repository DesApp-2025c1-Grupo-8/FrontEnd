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

const estadosPosibles = [
  { value: "Activo", label: "Activo" },
  { value: "Inactivo", label: "Inactivo" },
];

const camposObligatorios = ["id", "nombre", "estado"];

const camposIniciales = {
  id: "",
  nombre: "",
  descripcion: "",
  estado: "",
};

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

  useEffect(() => {
    if (modo === "alta") {
      setForm(camposIniciales);
      setModoInterno("alta");
    } else if (estadoRemito) {
      setForm({ ...estadoRemito });
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
      // Aquí se emitiría un evento o acción para guardar el estado
      console.log("Guardar estado:", form);
    }
  };

  const handleEditar = () => {
    setModoInterno("modificacion");
  };

  const handleEliminar = () => {
    // Acción visual para eliminar
    console.log("Eliminar estado:", form.id);
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
            {modoInterno === "consulta" && (
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
                    label="ID"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    fullWidth
                    disabled={
                      !camposEditables || modoInterno === "modificacion"
                    } // No editable al modificar para evitar cambiar el id
                    error={!!errores.id}
                    helperText={mensajesError.id}
                    size="small"
                  />
                  {errores.id && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
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
