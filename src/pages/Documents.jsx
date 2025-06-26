import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Grid, Pagination, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectRemitos } from "../redux/remitos/remitosSlice";

import ModalRemito from "../components/ModalRemito";
import RemitoCard from "../components/RemitoCard";
import SearchBar from "../components/SearchBar";
import FiltrosAvanzadosRemitos from "../components/FiltrosAvanzadosRemitos";

function Documents() {
  const remitos = useSelector(selectRemitos);
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

  const handleDelete = (remito) =>
    alert(`Eliminar remito: ${remito.numeroRemito}`);
  const handleDownload = (remito) =>
    alert(`Descargar remito: ${remito.numeroRemito}`);

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

  const totalPages = Math.ceil(remitosFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const remitosPaginados = remitosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
        {remitosPaginados.map((remito) => (
          <RemitoCard
            key={remito.numeroRemito}
            remito={remito}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
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
      />
    </Box>
  );
}

export default Documents;
