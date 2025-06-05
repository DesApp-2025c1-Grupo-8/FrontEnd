import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';
import ReporteDestacadoBox from '../components/ReporteDestacadoBox';
import ModalReporte from "../components/ModalReporte";
import SearchBar from '../components/SearchBar';
import ReporteCard from '../components/ReporteCard';

// Lista de reportes destacados que se muestran en la parte superior
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

/**
 * Componente principal de la página de Reportes
 * @returns {JSX.Element} - Página completa de reportes
 */
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
  const handleEdit = (reporte) => alert(`Editar reporte: ${reporte.id}`);
  const handleCopy = (reporte) => alert(`Copiar reporte: ${reporte.id}`);
  const handleDownload = (reporte) => alert(`Descargar reporte: ${reporte.id}`);
  const handleDelete = (reporte) => {
    if (window.confirm(`¿Seguro que deseas eliminar el reporte ${reporte.id}?`)) {
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

      {/* Botón para generar nuevo reporte */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<AssessmentIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: '#8BAAAD',
            '&:hover': {
              backgroundColor: '#6B8A8D',
            },
          }}
        >
          Generar Nuevo Reporte
        </Button>
      </Box>

      {/* Sección de reportes destacados */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 3, md: 4 },
          flexWrap: 'wrap',
          mb: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          px: { xs: 1, sm: 2 },
        }}
      >
        {reportesDestacados.map((reporte, idx) => (
          <Button
            key={idx}
            variant="contained"
            startIcon={reporte.icon}
            sx={{
              backgroundColor: '#4A90A4',
              color: 'white',
              padding: { xs: '10px 16px', sm: '12px 20px' },
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: { xs: '12px', sm: '14px' },
              fontWeight: 'medium',
              width: { xs: '320px', sm: '280px', md: '300px' },
              height: { xs: '60px', sm: '56px' },
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#3A7A8A',
              },
            }}
            onClick={() => alert(`Generar reporte: ${reporte.titulo}`)}
          >
            {reporte.titulo}
          </Button>
        ))}
      </Box>

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

      {/* Modal para generar nuevo reporte */}
      <ModalReporte
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}

export default Reports;