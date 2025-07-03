import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Typography, Grid, Pagination, Alert, CircularProgress } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useRemitos } from "../hooks/useRemitos";

import ModalRemito from "../components/ModalRemito";
import RemitoCard from "../components/RemitoCard";
import SearchBar from "../components/SearchBar";
import FiltrosAvanzadosRemitos from "../components/FiltrosAvanzadosRemitos";

function Documents() {
  const {
    remitos,
    loading,
    error,
    cargarRemitos,
    crearRemito,
    actualizarRemito,
    eliminarRemito,
    descargarRemito
  } = useRemitos();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para filtros avanzados
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    numeroRemito: "",
    numeroRemitoDesde: "",
    numeroRemitoHasta: "",
    cliente: "",
    valorDesde: "",
    valorHasta: "",
    provinciaOrigen: "",
    provinciaDestino: "",
    estado: "",
    fechaDesde: "",
    fechaHasta: "",
    contenido: {
      pallets: false,
      bultos: false,
      racks: false,
      bobinas: false,
      tambores: false,
    },
  });

  useEffect(() => {
    cargarRemitos();
  }, []);

  // Eliminar remito usando hook
  const handleDelete = async (remito) => {
    if (window.confirm(`¿Seguro que deseas eliminar el remito: ${remito.numeroRemito}?`)) {
      const result = await eliminarRemito(remito.numeroRemito);
      if (result.success) {
        console.log("Remito eliminado exitosamente");
      } else {
        console.error("Error al eliminar remito:", result.error);
      }
    }
  };

  // Descargar remito usando hook
  const handleDownload = async (remito) => {
    const result = await descargarRemito(remito.numeroRemito);
    if (result.success) {
      console.log("Remito descargado exitosamente");
    } else {
      console.error("Error al descargar remito:", result.error);
      alert("Error al descargar el remito. Verifica que el backend esté disponible.");
    }
  };

  // Función para aplicar filtros avanzados
  const aplicarFiltrosAvanzados = (remitos) => {
    return remitos.filter((remito) => {
      // Filtro por número de remito (exacto o rango)
      if (filtrosAvanzados.numeroRemito) {
        if (!remito.numeroRemito?.includes(filtrosAvanzados.numeroRemito)) {
          return false;
        }
      }
      if (filtrosAvanzados.numeroRemitoDesde && remito.numeroRemito < filtrosAvanzados.numeroRemitoDesde) {
        return false;
      }
      if (filtrosAvanzados.numeroRemitoHasta && remito.numeroRemito > filtrosAvanzados.numeroRemitoHasta) {
        return false;
      }

      // Filtro por cliente
      if (filtrosAvanzados.cliente && !remito.razonSocial?.toLowerCase().includes(filtrosAvanzados.cliente.toLowerCase())) {
        return false;
      }

      // Filtro por rango de valor
      const valorRemito = parseFloat(remito.valor) || 0;
      if (filtrosAvanzados.valorDesde && valorRemito < parseFloat(filtrosAvanzados.valorDesde)) {
        return false;
      }
      if (filtrosAvanzados.valorHasta && valorRemito > parseFloat(filtrosAvanzados.valorHasta)) {
        return false;
      }

      // Filtro por provincia de origen (simulado)
      if (filtrosAvanzados.provinciaOrigen) {
        // Por ahora simulamos que todos los remitos son de Buenos Aires
        if (filtrosAvanzados.provinciaOrigen !== "Buenos Aires") {
          return false;
        }
      }

      // Filtro por provincia de destino
      if (filtrosAvanzados.provinciaDestino) {
        const destinoLower = remito.destino?.toLowerCase() || "";
        if (!destinoLower.includes(filtrosAvanzados.provinciaDestino.toLowerCase())) {
          return false;
        }
      }

      // Filtro por estado
      if (filtrosAvanzados.estado && remito.estado !== filtrosAvanzados.estado) {
        return false;
      }

      // Filtro por rango de fechas
      if (filtrosAvanzados.fechaDesde && remito.fechaEmision < filtrosAvanzados.fechaDesde) {
        return false;
      }
      if (filtrosAvanzados.fechaHasta && remito.fechaEmision > filtrosAvanzados.fechaHasta) {
        return false;
      }

      // Filtro por contenido específico
      const contenidoFiltros = filtrosAvanzados.contenido;
      if (contenidoFiltros.pallets && parseInt(remito.pallets) === 0) {
        return false;
      }
      if (contenidoFiltros.bultos && parseInt(remito.bultos) === 0) {
        return false;
      }
      if (contenidoFiltros.racks && parseInt(remito.racks) === 0) {
        return false;
      }
      if (contenidoFiltros.bobinas && parseInt(remito.bobinas) === 0) {
        return false;
      }
      if (contenidoFiltros.tambores && parseInt(remito.tambores) === 0) {
        return false;
      }

      return true;
    });
  };

  // Aplicar filtros combinados (búsqueda simple + filtros avanzados)
  const remitosFiltrados = useMemo(() => {
    let remitosFiltrados = remitos;

    // Primero aplicar filtros avanzados
    remitosFiltrados = aplicarFiltrosAvanzados(remitosFiltrados);

    // Luego aplicar búsqueda simple si existe
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      remitosFiltrados = remitosFiltrados.filter((remito) =>
        Object.values(remito).some((valor) =>
          String(valor).toLowerCase().includes(lowerSearch)
        )
      );
    }

    return remitosFiltrados;
  }, [remitos, searchTerm, filtrosAvanzados]);

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

  // Función para limpiar filtros avanzados
  const limpiarFiltrosAvanzados = () => {
    setPage(1);
  };

  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("alta");
  const [remito, setRemito] = useState(null);

  const handleAdd = () => {
    setModo("alta");
    setRemito(null);
    setOpen(true);
  };

  const handleEdit = (remitoSeleccionado) => {
    setModo("modificacion");
    setRemito(remitoSeleccionado);
    setOpen(true);
  };

  const handleView = (remitoSeleccionado) => {
    setModo("consulta");
    setRemito(remitoSeleccionado);
    setOpen(true);
  };

  // Guardar remito (alta o modificación)
  const handleSave = async (datos, modoModal) => {
    let result;
    if (modoModal === "alta") {
      result = await crearRemito(datos);
    } else if (modoModal === "modificacion") {
      result = await actualizarRemito(datos.numeroRemito, datos);
    }
    
    if (result && result.success) {
      setOpen(false);
    } else {
      console.error("Error al guardar remito:", result?.error);
    }
  };

  const totalPages = Math.ceil(remitosFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const remitosPaginados = remitosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        Gestión de Remitos
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
        Remitos: {remitos?.length || 0}
        {error ? ' (Con errores de conexión)' : ''}
      </Alert>

      {/* Resumen de resultados */}
      {remitosFiltrados.length !== remitos.length && (
        <Alert severity="info">
          Se encontraron <strong>{remitosFiltrados.length}</strong> remitos de <strong>{remitos.length}</strong> total.
        </Alert>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          display="flex"
          gap={2}
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <SearchBar
            placeholder="Buscar remito"
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
          Nuevo Remito
        </Button>
      </Box>

      {/* Componente de Filtros Avanzados */}
      <FiltrosAvanzadosRemitos
        filtros={filtrosAvanzados}
        onFiltrosChange={setFiltrosAvanzados}
        onLimpiarFiltros={limpiarFiltrosAvanzados}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {error ? (
          <Alert severity="warning" sx={{ py: 4 }}>
            <Typography variant="h6" gutterBottom>
              No se pueden cargar los remitos
            </Typography>
            <Typography variant="body2">
              El backend no está disponible. Verifica que el servidor esté corriendo en https://localhost:7265
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={cargarRemitos}
            >
              Reintentar
            </Button>
          </Alert>
        ) : remitosPaginados.length > 0 ? (
          remitosPaginados.map((remito) => (
            <RemitoCard
              key={remito.numeroRemito}
              remito={remito}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            {loading ? 'Cargando remitos...' : 'No hay remitos disponibles'}
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

      <ModalRemito
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        remito={remito}
        onSave={handleSave}
      />
    </Box>
  );
}

export default Documents;
