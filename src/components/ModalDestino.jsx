import { useState, useEffect } from "react"
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
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { useDispatch, useSelector } from "react-redux"
import { buscarDirecciones, limpiarSugerencias } from "../redux/direcciones/direccionesSlice"

const camposIniciales = {
  nombre: "",
  calle: "",
  altura: "",
  municipio: "",
  localidad: "",
  codigo_postal: "",
  provincia: "",
  pais: "",
}

const ModalDestino = ({ open, onClose, modo = "alta", destino = null }) => {
  const dispatch = useDispatch()
  const { sugerencias = [], estado = "idle" } = useSelector(
    (state) => state.direcciones || { sugerencias: [], estado: "idle" },
  )
  const [form, setForm] = useState(camposIniciales)
  const [direccionInput, setDireccionInput] = useState("")
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const cargando = estado === "loading"

  const esConsulta = modo === "consulta"

  useEffect(() => {
    if (modo === "alta" || !destino) {
      setForm(camposIniciales)
      setDireccionInput("")
    } else {
      setForm({
        nombre: destino.nombre || "",
        calle: destino.calle || "",
        altura: destino.altura || "",
        municipio: destino.municipio || "",
        localidad: destino.localidad || "",
        codigo_postal: destino.codigo_postal || "",
        provincia: destino.provincia || "",
        pais: destino.pais || "",
      })
      setDireccionInput(`${destino.calle || ""} ${destino.altura || ""}`.trim())
    }
  }, [modo, destino])

  // Limpiar sugerencias al cerrar el modal
  useEffect(() => {
    if (!open) {
      dispatch(limpiarSugerencias())
    }

    // Cleanup al desmontar el componente
    return () => {
      dispatch(limpiarSugerencias())
    }
  }, [open, dispatch])

  // Búsqueda automática con debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!esConsulta && direccionInput.length >= 3) {
        dispatch(buscarDirecciones(direccionInput))
        setOpenAutocomplete(true)
      } else if (direccionInput.length < 3) {
        dispatch(limpiarSugerencias())
        setOpenAutocomplete(false)
      }
    }, 500) // espera 500ms después de escribir

    return () => clearTimeout(handler)
  }, [direccionInput, esConsulta, dispatch])

  const handleSeleccionDireccion = (option) => {
    if (!option) return

    // Verificar si option tiene la estructura esperada
    if (option && option.address) {
      const address = option.address

      setForm((prev) => ({
        ...prev,
        calle: address.road || address.street || "",
        altura: address.house_number || "",
        municipio: address.county || address.state_district || address.village || "",
        localidad: address.city || address.town || address.village || "",
        codigo_postal: address.postcode || "",
        provincia: address.state || "",
        pais: address.country || "",
      }))

      //setDireccionInput(option.display_name)
    } else if (typeof option === "object") {
      // Fallback para cuando la estructura no es la esperada
      console.log("Estructura de dirección inesperada:", option)
      setDireccionInput(option.display_name || "")
    }
  }

  const handleChangeCampo = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGuardar = () => {
    console.log("Destino guardado:", form)
    onClose()
  }

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
            {modo === "alta" ? "Nuevo Destino" : modo === "modificacion" ? "Editar Destino" : "Detalle del Destino"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: "1px solid #b2ebf2", borderRadius: 2, p: 2, mt: 2 }}>
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
                />
              </Grid>

              {!esConsulta && (<Grid item xs={12} sx={{ width: "100%" }}>
                <Autocomplete
                  freeSolo
                  options={sugerencias || []}
                  getOptionLabel={(option) => (typeof option === "string" ? option : option.display_name || "")}
                  inputValue={direccionInput}
                  onInputChange={(e, newInputValue) => !esConsulta && setDireccionInput(newInputValue)}
                  onChange={(e, newValue) => !esConsulta && handleSeleccionDireccion(newValue)}
                  open={openAutocomplete && sugerencias && sugerencias.length > 0}
                  onOpen={() => {
                    if (sugerencias && sugerencias.length > 0) {
                      setOpenAutocomplete(true)
                    }
                  }}
                  onClose={() => setOpenAutocomplete(false)}
                  loading={cargando}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <LocationOnIcon sx={{ color: "text.secondary", mr: 1 }} />
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
                      label="Buscador de dirección"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {cargando ? <CircularProgress color="inherit" size={20} /> : null}
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
              </Grid>)}

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Calle"
                  name="calle"
                  value={form.calle}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
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
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="País"
                  name="pais"
                  value={form.pais}
                  onChange={handleChangeCampo}
                  fullWidth
                  size="small"
                  disabled={esConsulta}
                />
              </Grid>
            </Grid>

            {!esConsulta && (
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleGuardar} color="primary">
                  Guardar
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default ModalDestino
