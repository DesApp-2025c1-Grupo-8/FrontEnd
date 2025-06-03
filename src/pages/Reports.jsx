import React, { useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';

import TableComponent from '../components/TableComponent'; // Importar nuevo componente
import ReporteDestacadoBox from '../components/ReporteDestacadoBox';
import ModalReporte from "../components/ModalReporte";

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
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };

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
    <Box display="flex" flexDirection="column" gap={2} bgcolor="#F4FFF8">
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
        DeleteIconVisible={true}
        DownloadIconVisible={true} // Si no usas descarga por ahora
      />

      <ModalReporte
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}

export default Reports;
