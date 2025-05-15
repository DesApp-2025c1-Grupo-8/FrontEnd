import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const camposIniciales = {
  nombre: "",
  calle: "",
  altura: "",
  municipio: "",
  localidad: "",
  codigo_postal: "",
  provincia: "",
  pais: "",
};

const ModalDestino = ({ open, onClose, modo = "alta", destino = null }) => {
  const [form, setForm] = useState(camposIniciales);
  const [direccionInput, setDireccionInput] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);

  // Cuando cambia el destino o el modo, actualizar form
  useEffect(() => {
    if (modo === "alta" || !destino) {
      setForm(camposIniciales);
      setDireccionInput("");
    } else {
      // Cargar los datos del destino seleccionado
      setForm({
        nombre: destino.nombre || "",
        calle: destino.calle || "",
        altura: destino.altura || "",
        municipio: destino.municipio || "",
        localidad: destino.localidad || "",
        codigo_postal: destino.codigo_postal || "",
        provincia: destino.provincia || "",
        pais: destino.pais || "",
      });
      // Si quieres, puedes inicializar direcciónInput con la calle + altura
      setDireccionInput(
        `${destino.calle || ""} ${destino.altura || ""}`.trim()
      );
    }
  }, [modo, destino]);

  const buscarDireccion = () => {
    if (direccionInput.length < 3) {
      setSugerencias([]);
      setOpenAutocomplete(false);
      return;
    }

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=ar&q=${encodeURIComponent(
        direccionInput
      )}`,
      { headers: { "Accept-Language": "es" } }
    )
      .then((res) => res.json())
      .then((data) => {
        setSugerencias(data);
        setOpenAutocomplete(true);
      })
      .catch(() => {});
  };

  const handleSeleccionDireccion = (option) => {
    if (!option || !option.address) return;
    const address = option.address;

    setForm((prev) => ({
      ...prev,
      calle: address.road || "",
      altura: address.house_number || "",
      municipio: address.state_district || address.village || "",
      localidad: address.town || address.city || "",
      codigo_postal: address.postcode || "",
      provincia: address.state || "",
      pais: address.country || "",
    }));

    setDireccionInput(option.display_name);
  };

  const handleChangeCampo = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    console.log("Destino guardado:", form);
    // Aquí puedes agregar lógica para guardar o actualizar según modo
    onClose();
  };

  const esConsulta = modo === "consulta";

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
              {/* Fila 1: nombre */}
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

              {/* Fila 2: dirección autocomplete */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Autocomplete
                  freeSolo
                  options={sugerencias}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.display_name
                  }
                  inputValue={direccionInput}
                  onInputChange={(e, newInputValue) =>
                    !esConsulta && setDireccionInput(newInputValue)
                  }
                  onChange={(e, newValue) =>
                    !esConsulta && handleSeleccionDireccion(newValue)
                  }
                  open={openAutocomplete}
                  onOpen={() => {
                    if (sugerencias.length > 0) {
                      setOpenAutocomplete(true);
                    }
                  }}
                  onClose={() => setOpenAutocomplete(false)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscador de dirección"
                      size="small"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (!esConsulta) buscarDireccion();
                        }
                      }}
                      disabled={esConsulta}
                    />
                  )}
                />
              </Grid>

              {/* Fila 3: altura, municipio, localidad */}
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

              {/* Fila 4: código postal, provincia, país */}
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

            {/* Botón guardar (oculto si es modo consulta) */}
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
