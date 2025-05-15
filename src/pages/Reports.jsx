import React from 'react';
import {
  Box,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';

import TableComponent from '../components/TableComponent'; // Importar nuevo componente
import ReporteDestacadoBox from '../components/ReporteDestacadoBox';
import Titulo from '../components/Titulo';

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
  // Ya no necesitamos cantidad y pagina, porque TableComponent maneja su propia paginación
  const reportes = useSelector(selectReportes);

  // Define columnas para TableComponent (usa las keys de tus objetos de reportes)
  const columnas = [
    { key: 'id', label: 'IDReporte' },
    { key: 'tipo', label: 'Tipo de reporte' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'parametros', label: 'Parámetros' },
  ];

  // Manejo de acciones
  const handleView = (row) => alert(`Ver reporte: ${row.id}`);
  const handleEdit = (row) => alert(`Editar reporte: ${row.id}`);
  const handleCopy = (row) => alert(`Copiar reporte: ${row.id}`);
  const handleDelete = (row) => {
    if (window.confirm(`¿Seguro que deseas eliminar el reporte ${row.id}?`)) {
      alert(`Reporte eliminado: ${row.id}`);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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

      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          mb: 4,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {reportesDestacados.map((reporte, idx) => (
          <ReporteDestacadoBox key={idx} icon={reporte.icon} titulo={reporte.titulo} />
        ))}
      </Box>

      <TableComponent
        columnas={columnas}
        filas={reportes}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
        ViewIconVisible={true}
        EditIconVisible={true}
        CopyIconVisible={true}
        DeleteIconVisible={true}
        DownloadIconVisible={false} // Si no usas descarga por ahora
      />
    </Box>
  );
}

export default Reports;
