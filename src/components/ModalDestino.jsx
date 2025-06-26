import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
  Typography,
  Box,
  Autocomplete,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import {
  buscarDirecciones,
  limpiarSugerencias,
} from "../redux/direcciones/direccionesSlice";

import {
  validarNumeroMayorACero,
  validarStringObligatorio,
} from "../utilidades/validations";
import { soloNumeros, sinNumeros } from "../utilidades/input-filters";

const camposIniciales = {
  nombre: "",
  calle: "",
  tipo_direccion: "",
  altura: "",
  municipio: "",
  localidad: "",
  codigo_postal: "",
  provincia: "",
};

// Definición de los tipos de direccion disponibles en el sistema
const tiposDireccion = [
  { value: "Destino", label: "Destino" },
  { value: "Domicilio", label: "Domicilio" },
];

const ModalDestino = ({ open, onClose, modo = "alta", destino = null }) => {
  const dispatch = useDispatch();
  const { sugerencias = [], estado = "idle" } = useSelector(
    (state) => state.direcciones || { sugerencias: [], estado: "idle" }
  );
  const [form, setForm] = useState(camposIniciales);
  const [direccionInput, setDireccionInput] = useState("");
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const cargando = estado === "loading";

  const esConsulta = modo === "consulta";

  useEffect(() => {
    if (open) {
      setDireccionInput("");
      if (modo === "alta" || !destino) {
        setForm(camposIniciales);
        setErrores({});
      } else {
        setForm({
          nombre: destino.nombre || "",
          tipo_direccion: destino.tipo_direccion || "",
          calle: destino.calle || "",
          altura: destino.altura || "",
          municipio: destino.municipio || "",
          localidad: destino.localidad || "",
          codigo_postal: destino.codigo_postal || "",
          provincia: destino.provincia || "",
        });
        setErrores({});
      }
    }
  }, [open, modo, destino]);

  // Limpiar sugerencias al cerrar el modal
  useEffect(() => {
    if (!open) {
      dispatch(limpiarSugerencias());
    }

    // Cleanup al desmontar el componente
    return () => {
      dispatch(limpiarSugerencias());
    };
  }, [open, dispatch]);

  // Búsqueda automática con debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!esConsulta && direccionInput.length >= 3) {
        dispatch(buscarDirecciones(direccionInput));
        setOpenAutocomplete(true);
      } else if (direccionInput.length < 3) {
        dispatch(limpiarSugerencias());
        setOpenAutocomplete(false);
      }
    }, 500); // espera 500ms después de escribir

    return () => clearTimeout(handler);
  }, [direccionInput, esConsulta, dispatch]);

  const handleSeleccionDireccion = (option) => {
    if (!option || !option.address) return;

    const address = option.address;

    const nuevosValores = {
      calle: address.road || address.street || "",
      altura: address.house_number || "",
      municipio:
        address.county || address.state_district || address.village || "",
      localidad: address.city || address.town || address.village || "",
      codigo_postal: address.postcode || "",
      provincia: address.state || "",
    };

    // Actualizar el formulario
    setForm((prev) => ({
      ...prev,
      ...nuevosValores,
    }));

    // Validar y actualizar errores de los campos modificados
    setErrores((prev) => {
      const nuevosErrores = { ...prev };
      Object.entries(nuevosValores).forEach(([key, value]) => {
        nuevosErrores[key] = validarCampo(key, value);
      });
      return nuevosErrores;
    });
  };

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};

    Object.entries(form).forEach(([key, value]) => {
      nuevosErrores[key] = validarCampo(key, value);
    });

    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((msg) => msg === "");
  };

  const validarCampo = (name, value) => {
    switch (name) {
      case "altura":
        return validarNumeroMayorACero(value, "Altura");
      case "nombre":
      case "calle":
      case "municipio":
      case "localidad":
      case "codigo_postal":
      case "provincia":
      case "tipo_direccion":
        return validarStringObligatorio(
          value,
          name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
        );
      default:
        return "";
    }
  };

  const handleChangeCampo = (e) => {
    const { name, value } = e.target;
    let valorFiltrado = value;

    switch (name) {
      case "altura":
        valorFiltrado = soloNumeros(value);
        break;
      case "calle":
        valorFiltrado = sinNumeros(value);
        break;
      case "municipio":
        valorFiltrado = sinNumeros(value);
        break;
      case "localidad":
        valorFiltrado = sinNumeros(value);
        break;
      case "provincia":
        valorFiltrado = sinNumeros(value);
        break;
    }
    // Actualiza el valor del campo
    setForm((prev) => ({ ...prev, [name]: valorFiltrado }));

    // Ejecuta validación según el campo
    let mensajeError = "";

    switch (name) {
      case "altura":
        mensajeError = validarNumeroMayorACero(value, "Altura");
        break;
      case "nombre":
        mensajeError = validarStringObligatorio(value, "Nombre");
        break;
      case "codigo_postal":
        mensajeError = validarStringObligatorio(value, "Codigo Postal");
        break;
      case "provincia":
        mensajeError = validarStringObligatorio(value, "Provincia");
        break;
      case "localidad":
        mensajeError = validarStringObligatorio(value, "Localidad");
        break;
      case "municipio":
        mensajeError = validarStringObligatorio(value, "Municipio");
        break;
      case "calle":
        mensajeError = validarStringObligatorio(value, "Calle");
        break;
      case "tipo_direccion":
        mensajeError = validarStringObligatorio(value, "Tipo de Direccion");
        break;
      default:
        mensajeError = "";
    }

    // Guarda el error en el estado
    setErrores((prev) => ({ ...prev, [name]: mensajeError }));
  };

  const handleDireccionInputChange = (e, newInputValue) => {
    if (esConsulta) return;

    const valorSinNumeros = sinNumeros(newInputValue);
    setDireccionInput(valorSinNumeros);
  };

  const handleGuardar = () => {
    if (!validarFormulario()) {
      console.warn("Hay errores. No se puede guardar.");
      return;
    }

    console.log("Destino guardado:", form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ border: "3px solid #0097a7", borderRadius: 3, m: 1 }}>
        <DialogTitle
          sx={{
            pb: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {modo === "alta"
              ? "Nuevo Destino"
              : modo === "modificacion"
              ? "Editar Destino"
              : "Detalle del Destino"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
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
              Información del destino
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre del destino"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.nombre)}
                  helperText={errores.nombre}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    select
                    label="Tipo de Direccion"
                    name="tipo_direccion"
                    value={form.tipo_direccion}
                    onChange={handleChangeCampo}
                    fullWidth
                    disabled={esConsulta}
                    size="small"
                    error={Boolean(errores.tipo_direccion)}
                    helperText={errores.tipo_direccion}
                  >
                    {tiposDireccion.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errores.tipoCliente && (
                    <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>

              {!esConsulta && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <Autocomplete
                    freeSolo
                    options={sugerencias || []}
                    getOptionLabel={(option) =>
                      typeof option === "string"
                        ? option
                        : option.display_name || ""
                    }
                    inputValue={direccionInput}
                    onInputChange={handleDireccionInputChange}
                    onChange={(e, newValue) =>
                      !esConsulta && handleSeleccionDireccion(newValue)
                    }
                    open={
                      openAutocomplete && sugerencias && sugerencias.length > 0
                    }
                    onOpen={() => {
                      if (sugerencias && sugerencias.length > 0) {
                        setOpenAutocomplete(true);
                      }
                    }}
                    onClose={() => setOpenAutocomplete(false)}
                    loading={cargando}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <LocationOnIcon
                              sx={{ color: "text.secondary", mr: 1 }}
                            />
                          </Grid>
                          <Grid item xs>
                            <Typography variant="body2" color="text.primary">
                              {option.display_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscador de dirección (sin altura)"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {cargando ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        helperText={
                          direccionInput.length > 0 && direccionInput.length < 3
                            ? "Ingresa al menos 3 caracteres para buscar"
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Calle"
                  name="calle"
                  value={form.calle}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.calle)}
                  helperText={errores.calle}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Altura"
                  name="altura"
                  value={form.altura}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.altura)}
                  helperText={errores.altura}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Municipio"
                  name="municipio"
                  value={form.municipio}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.municipio)}
                  helperText={errores.municipio}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Localidad"
                  name="localidad"
                  value={form.localidad}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.localidad)}
                  helperText={errores.localidad}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Código Postal"
                  name="codigo_postal"
                  value={form.codigo_postal}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.codigo_postal)}
                  helperText={errores.codigo_postal}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Provincia"
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                  error={Boolean(errores.provincia)}
                  helperText={errores.provincia}
                />
              </Grid>
            </Grid>

            {!esConsulta && (
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleGuardar}
                  color="primary"
                >
                  Guardar
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ModalDestino;
