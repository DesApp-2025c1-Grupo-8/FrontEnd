"use client";

import { useState, useEffect } from "react";
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

import { useSelector } from "react-redux";
import { selectDestinos } from "../redux/destinos/destinosSlice";

// Importar validaciones y filtros
import {
  validarStringObligatorio,
  validarCUIT,
  validarEmail,
  validarTelefonoCliente,
} from "../utilidades/validations";
import {
  formatearCUIT,
  soloLetrasYEspacios,
  soloNumeros,
} from "../utilidades/input-filters";

const tiposCliente = [
  { value: "privado", label: "Privada" },
  { value: "estatal", label: "Estatal" },
  { value: "particular", label: "Particular" },
];

const camposIniciales = {
  razonSocial: "",
  cuit: "",
  tipo: "",
  direccionId: "",
  provincia: "",
  municipio: "",
  localidad: "",
  calle: "",
  altura: "",
  telefono: "",
  email: "",
  personasAutorizadas: "",
};

function ModalCliente({ open, onClose, modo = "alta", cliente = null, onSave }) {
  const [form, setForm] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [modoInterno, setModoInterno] = useState(modo);

  const destinos = useSelector(selectDestinos);

  //const esConsulta = modo === "consulta"

  useEffect(() => {
    if (open) {
      if (modo === "alta") {
        setForm(camposIniciales);
        setModoInterno("alta");
      } else if (cliente) {
        // Mapear los datos del cliente al formulario
        const clienteFormateado = {
          razonSocial: cliente.razonSocial || "",
          cuit: cliente["CUIT/RUT"] || "",
          tipo: cliente.tipo || "",
          direccionId: cliente.direccion || "",
          telefono: cliente.telefono || "",
          email: cliente.email || "",
          personasAutorizadas: cliente.personasAutorizadas || "",
          provincia: "",
          municipio: "",
          localidad: "",
          calle: "",
          altura: "",
        };

        // Si hay una dirección seleccionada, buscar los datos completos
        if (cliente.direccion) {
          const destinoSeleccionado = destinos.find(
            (dest) => dest.id === cliente.direccion
          );
          if (destinoSeleccionado) {
            clienteFormateado.provincia = destinoSeleccionado.provincia || "";
            clienteFormateado.municipio = destinoSeleccionado.municipio || "";
            clienteFormateado.localidad = destinoSeleccionado.localidad || "";
            clienteFormateado.calle = destinoSeleccionado.calle || "";
            clienteFormateado.altura = destinoSeleccionado.altura || "";
          }
        }

        setForm(clienteFormateado);
        setModoInterno(modo);
      }
      setErrores({});
    }
  }, [open, modo, cliente, destinos]);

  // Efecto para sincronizar los campos de dirección cuando cambia direccionId
  useEffect(() => {
    if (
      form.direccionId &&
      (modoInterno === "alta" || modoInterno === "modificacion")
    ) {
      const destinoSeleccionado = destinos.find(
        (dest) => dest.id === form.direccionId
      );
      if (destinoSeleccionado) {
        setForm((prev) => ({
          ...prev,
          provincia: destinoSeleccionado.provincia || "",
          municipio: destinoSeleccionado.municipio || "",
          localidad: destinoSeleccionado.localidad || "",
          calle: destinoSeleccionado.calle || "",
          altura: destinoSeleccionado.altura || "",
        }));
      }
    } else if (
      !form.direccionId &&
      (modoInterno === "alta" || modoInterno === "modificacion")
    ) {
      setForm((prev) => ({
        ...prev,
        provincia: "",
        municipio: "",
        localidad: "",
        calle: "",
        altura: "",
      }));
    }
  }, [form.direccionId, destinos, modoInterno]);

  // Función para validar un campo individual
  const validarCampo = (name, value) => {
    switch (name) {
      case "razonSocial":
        return validarStringObligatorio(value, "Razón Social");
      case "cuit":
        return validarCUIT(value);
      case "tipo":
        return validarStringObligatorio(value, "Tipo de Cliente");
      case "direccionId":
        return validarStringObligatorio(value, "Dirección");
      case "telefono":
        return validarTelefonoCliente(value);
      case "email":
        return validarEmail(value);
      case "personasAutorizadas":
        return validarStringObligatorio(value, "Personas Autorizadas");
      default:
        return "";
    }
  };

  // Función para validar todo el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar campos obligatorios
    const camposObligatorios = [
      "razonSocial",
      "cuit",
      "tipo",
      "direccionId",
      "telefono",
      "email",
      "personasAutorizadas",
    ];

    camposObligatorios.forEach((campo) => {
      nuevosErrores[campo] = validarCampo(campo, form[campo]);
    });

    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((msg) => msg === "");
  };

  // Manejar cambios en los campos con validación en tiempo real
  const handleChangeCampo = (e) => {
    const { name, value } = e.target;
    let valorFiltrado = value;

    // Aplicar filtros según el campo
    switch (name) {
      case "razonSocial":
        // Permitir letras, números, espacios y algunos caracteres especiales para nombres de empresas
        valorFiltrado = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.\-&]/g, "");
        break;
      case "cuit":
        valorFiltrado = formatearCUIT(value);
        break;
      case "telefono":
        valorFiltrado = soloNumeros(value);
        break;
      case "personasAutorizadas":
        valorFiltrado = soloLetrasYEspacios(value);
        break;
      default:
        valorFiltrado = value;
    }

    // Actualizar el formulario
    setForm((prev) => ({ ...prev, [name]: valorFiltrado }));

    // Validar el campo y actualizar errores
    const mensajeError = validarCampo(name, valorFiltrado);
    setErrores((prev) => ({ ...prev, [name]: mensajeError }));
  };

  const handleGuardar = async () => {
    if (!validarFormulario()) {
      console.warn("Hay errores en el formulario. No se puede guardar.");
      return;
    }

    // Preparar los datos del cliente en el formato esperado
    const datosCliente = {
      razonSocial: form.razonSocial,
      "CUIT/RUT": form.cuit,
      tipo: form.tipo,
      direccion: form.direccionId,
      telefono: form.telefono,
      email: form.email,
      personasAutorizadas: form.personasAutorizadas,
    };

    // Si es modificación, incluir el IUC
    if (modoInterno === "modificacion" && cliente) {
      datosCliente.IUC = cliente.IUC;
    }

    console.log("Datos del cliente a guardar:", datosCliente);

    // Si hay función onSave, usarla
    if (onSave) {
      await onSave(datosCliente, modoInterno);
    } else {
      console.log("Cliente guardado (sin backend):", datosCliente);
      onClose();
    }
  };

  const handleEditar = () => {
    setModoInterno("modificacion");
  };

  const handleEliminar = () => {
    if (window.confirm("¿Está seguro que desea eliminar este cliente?")) {
      console.log("Eliminar cliente:", cliente);
      onClose();
    }
  };

  const camposEditables =
    modoInterno === "alta" || modoInterno === "modificacion";

  const getTitulo = () => {
    if (modoInterno === "alta") return "Nuevo Cliente";
    if (modoInterno === "modificacion") return "Editar Cliente";
    return "Información del Cliente";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
              Información del cliente
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Razón Social"
                  name="razonSocial"
                  value={form.razonSocial}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.razonSocial)}
                  helperText={errores.razonSocial}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="CUIT/RUT"
                  name="cuit"
                  value={form.cuit}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.cuit)}
                  helperText={errores.cuit || "Formato: XX-XXXXXXXX-X"}
                  size="small"
                  placeholder="20-12345678-9"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: { xs: "100%", sm: "50%" } }}
              >
                <TextField
                  select
                  label="Tipo de Cliente"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.tipo)}
                  helperText={errores.tipo}
                  size="small"
                >
                  {tiposCliente.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: "100%", sm: "50%" } }}>
                <TextField
                  select
                  label="Dirección"
                  name="direccionId"
                  value={form.direccionId || ""}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.direccionId)}
                  helperText={errores.direccionId}
                  size="small"
                >
                  {destinos.map((dest) => (
                    <MenuItem key={dest.id} value={dest.id}>
                      {`${dest.nombre} - ${dest.calle} ${dest.altura}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Campos de dirección - siempre visibles cuando hay una dirección seleccionada */}
              {form.direccionId && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Provincia"
                      name="provincia"
                      value={form.provincia}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Municipio"
                      name="municipio"
                      value={form.municipio}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Localidad"
                      name="localidad"
                      value={form.localidad}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Código Postal"
                      name="codigoPostal"
                      value={form.codigoPostal || ""}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Calle"
                      name="calle"
                      value={form.calle}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Altura"
                      name="altura"
                      value={form.altura}
                      fullWidth
                      disabled
                      size="small"
                      variant={
                        modoInterno === "consulta" ? "filled" : "outlined"
                      }
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.telefono)}
                  helperText={errores.telefono || "Ej: 01112345678"}
                  size="small"
                  placeholder="1112345678"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.email)}
                  helperText={errores.email}
                  size="small"
                  type="email"
                  placeholder="ejemplo@empresa.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Personas Autorizadas"
                  name="personasAutorizadas"
                  value={form.personasAutorizadas}
                  onChange={handleChangeCampo}
                  fullWidth
                  disabled={!camposEditables}
                  error={Boolean(errores.personasAutorizadas)}
                  helperText={
                    errores.personasAutorizadas ||
                    "Nombres de las personas autorizadas"
                  }
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Juan Pérez, María González"
                />
              </Grid>
            </Grid>
          </Box>
          {(modoInterno === "alta" || modoInterno === "modificacion") && (
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
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
