import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Typography, Pagination, CircularProgress, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useDestinos } from "../hooks/useDestinos";
import ModalDestino from "../components/ModalDestino";
import DestinoCard from "../components/DestinoCard";
import SearchBar from "../components/SearchBar";

function Destinations() {
  const {
    destinos,
    loading,
    error,
    cargarDestinos,
    crearDestino,
    actualizarDestino,
    eliminarDestino
  } = useDestinos();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    cargarDestinos();
  }, []);

  const handleCopy = (row) => {
    const {
      calle = "",
      altura = "",
      municipio = "",
      localidad = "",
      codigo_postal = "",
      provincia = "",
    } = row;
    const direccionFormateada =
      `${calle}, ${altura}, ${municipio}, ${localidad}, CP:${codigo_postal}, ${provincia}, Argentina`.trim();
    navigator.clipboard
      .writeText(direccionFormateada)
      .then(() => {
        alert("Dirección copiada al portapapeles.");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        alert("No se pudo copiar la dirección.");
      });
  };

  // Eliminar destino usando hook
  const handleDelete = async (row) => {
    if (window.confirm(`¿Seguro que deseas eliminar el destino: ${row.nombre}?`)) {
      const result = await eliminarDestino(row.id);
      if (result.success) {
        console.log("Destino eliminado exitosamente");
      } else {
        console.error("Error al eliminar destino:", result.error);
      }
    }
  };

  const destinosFiltrados = useMemo(() => {
    if (!searchTerm) return destinos;
    const lowerSearch = searchTerm.toLowerCase();
    return destinos.filter((destino) =>
      Object.values(destino).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [destinos, searchTerm]);

  const handleBuscarClick = () => {
    setSearchTerm(searchInput.trim());
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }
  };

  const [open, setOpen] = useState(false); // Controla si el modal está abierto
  const [modo, setModo] = useState("alta"); // Modo del modal (alta, modificación, consulta)
  const [destino, setDestino] = useState(null); // Datos del destino seleccionado

  const handleAdd = () => {
    setModo("alta");
    setDestino(null);
    setOpen(true);
  };

  const handleEdit = (destinoEjemplo) => {
    setModo("modificacion");
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  const handleView = (destinoEjemplo) => {
    setModo("consulta");
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  // Guardar destino (alta o modificación)
  const handleSave = async (datos, modoModal) => {
    let result;
    if (modoModal === "alta") {
      result = await crearDestino(datos);
    } else if (modoModal === "modificacion") {
      result = await actualizarDestino(datos.id, datos);
    }
    
    if (result && result.success) {
      setOpen(false);
    } else {
      console.error("Error al guardar destino:", result?.error);
    }
  };

  const totalPages = Math.ceil(destinosFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const destinosPaginados = destinosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Mostrar loading o error
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} bgcolor="#F4FFF8" p={3}>
      <Typography
        variant="h2"
        sx={{
          color: "black",
          borderBottom: "3px solid #4D4847",
          width: "fit-content",
        }}
      >
        Gestión de Destinos
      </Typography>

      {/* Mostrar errores si existen */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Error de conexión con el backend:</strong> {error}
          <br />
          <small>Verifica que el backend esté corriendo en https://localhost:7265</small>
        </Alert>
      )}

      {/* Debug info */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Destinos: {destinos?.length || 0}
        {error ? ' (Con errores de conexión)' : ''}
      </Alert>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{flexDirection: { xs: 'column', sm: 'row' }, gap:{ xs: 2, sm: 0 }}}>
        <Box display="flex" gap={2} sx={{flexDirection: { xs: 'column', sm: 'row' } }}>
          <SearchBar
            placeholder="Buscar destino"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleBuscarClick}
          >
            Buscar
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAdd}
          disabled={!!error}
        >
          Nueva Dirección
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {error ? (
          <Alert severity="warning" sx={{ py: 4 }}>
            <Typography variant="h6" gutterBottom>
              No se pueden cargar los destinos
            </Typography>
            <Typography variant="body2">
              El backend no está disponible. Verifica que el servidor esté corriendo en https://localhost:7265
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={cargarDestinos}
            >
              Reintentar
            </Button>
          </Alert>
        ) : destinosPaginados.length > 0 ? (
          destinosPaginados.map((destino) => (
            <DestinoCard
              key={destino.id}
              destino={destino}
              onView={handleView}
              onEdit={handleEdit}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            {loading ? 'Cargando destinos...' : 'No hay destinos disponibles'}
          </Typography>
        )}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <ModalDestino
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        destino={destino}
        onSave={handleSave}
      />
    </Box>
  );
}

export default Destinations;
