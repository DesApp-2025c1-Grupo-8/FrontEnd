import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';

import TableComponent from '../components/TableComponent';
import ReporteDestacadoBox from '../components/ReporteDestacadoBox';
import ModalReporte from "../components/ModalReporte";

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
  // Estado para controlar la visibilidad del modal de nuevo reporte
  const [open, setOpen] = useState(false);

  // Manejador para abrir el modal de nuevo reporte
  const handleAdd = () => {
    setOpen(true);
  };

  // Obtener la lista de reportes desde Redux
  const reportes = useSelector(selectReportes);

  // Configuración de columnas para la tabla de reportes
  const columnas = [
    { key: 'id', label: 'IDReporte' },
    { key: 'tipo', label: 'Tipo de reporte' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'parametros', label: 'Parámetros' },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2} bgcolor="#F4FFF8">
      {/* Título de la página */}
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

      {/* Tabla de reportes */}
      <TableComponent
        columnas={columnas}
        filas={reportes}
        ViewIconVisible={true}
        EditIconVisible={true}
        DeleteIconVisible={true}
      />

      {/* Modal para generar nuevo reporte */}
      <ModalReporte
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}

export default Reports;