import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Pagination,
  Button,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';

import ReporteCard from '../components/ReporteCard';
import ReporteDestacadoBox from '../components/ReporteDestacadoBox';
import SearchBar from '../components/SearchBar';

const reportesDestacados = [
  {
    titulo: 'Volumen total de mercadería por cliente/período',
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    titulo: 'Distribución geográfica de orígenes y destinos',
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    titulo: 'Análisis de valor declarado por tipo de mercadería',
    icon: <DescriptionIcon fontSize="large" />,
  },
];

function Reports() {
  const reportes = useSelector(selectReportes);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleEdit = (reporte) => alert(`Editar reporte: ${reporte.id}`);
  const handleCopy = (reporte) => alert(`Copiar reporte: ${reporte.id}`);
  const handleDownload = (reporte) => alert(`Descargar reporte: ${reporte.id}`);
  const handleDelete = (reporte) => {
    if (window.confirm(`¿Seguro que deseas eliminar el reporte ${reporte.id}?`)) {
      alert(`Reporte eliminado: ${reporte.id}`);
    }
  };

  const handleAdd = () => {
    alert("Crear nuevo reporte");
  };

  // Calcular paginación
  const totalPages = Math.ceil(reportesFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const reportesPaginados = reportesFiltrados.slice(startIndex, startIndex + itemsPerPage);

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
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          mb: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {reportesDestacados.map((reporte, idx) => (
          <ReporteDestacadoBox key={idx} icon={reporte.icon} titulo={reporte.titulo} />
        ))}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
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

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Nuevo Reporte
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {reportesPaginados.map((reporte) => (
          <ReporteCard
            key={reporte.id}
            reporte={reporte}
            onView={handleView}
            onEdit={handleEdit}
            onCopy={handleCopy}
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
    </Box>
  );
}

export default Reports;
