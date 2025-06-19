import React, { useState, useMemo } from "react";
import { Box, Typography, Button, Pagination } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectReportes } from "../redux/reportes/reportesSlice";
import ReporteDestacadoBox from "../components/ReporteDestacadoBox";
import ModalReporte from "../components/ModalReporte";
import SearchBar from "../components/SearchBar";
import ReporteCard from "../components/ReporteCard";

function Reports() {
  const reportes = useSelector(selectReportes);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);

  const reportesFiltrados = useMemo(() => {
    if (!searchTerm) return reportes;

    const lowerSearch = searchTerm.toLowerCase();
    return reportes.filter((reporte) =>
      Object.values(reporte).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [reportes, searchTerm]);

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

  // Manejo de acciones
  const handleView = (reporte) => alert(`Ver reporte: ${reporte.id}`);
  const handleDownload = (reporte) => alert(`Descargar reporte: ${reporte.id}`);
  const handleDelete = (reporte) => {
    if (
      window.confirm(`¿Seguro que deseas eliminar el reporte ${reporte.id}?`)
    ) {
      alert(`Reporte eliminado: ${reporte.id}`);
    }
  };

  // Función para abrir el modal de nuevo reporte
  const handleAdd = () => {
    setOpen(true);
  };

  // Calcular paginación
  const totalPages = Math.ceil(reportesFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const reportesPaginados = reportesFiltrados.slice(
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
        Reportes
      </Typography>

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
            placeholder="Buscar reporte"
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
        {/* Botón para generar nuevo reporte */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<AssessmentIcon />}
            onClick={handleAdd}
            color="primary"
          >
            Generar Nuevo Reporte
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {reportesPaginados.map((reporte) => (
          <ReporteCard
            key={reporte.id}
            reporte={reporte}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
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

      {/* Modal para generar nuevo reporte */}
      <ModalReporte open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default Reports;
