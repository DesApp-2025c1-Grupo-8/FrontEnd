import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Pagination,
  Select,
  MenuItem,
  FormControl,

} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from 'react-redux';
import { selectReportes } from '../redux/reportes/reportesSlice';

import TablaReportes from '../components/TablaReportes';
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
  const [cantidad, setCantidad] = useState(5);
  const [pagina, setPagina] = useState(1);

  // Obtener los reportes desde Redux
  const reportes = useSelector(selectReportes);

  const handleChangeCantidad = (event) => {
    setCantidad(event.target.value);
    setPagina(1);
  };

  const handleChangePagina = (event, value) => {
    setPagina(value);
  };

  // Funciones para acciones de la tabla
  const handleView = (row) => {
    alert(`Ver reporte: ${row.id}`);
  };
  const handleEdit = (row) => {
    alert(`Editar reporte: ${row.id}`);
  };
  const handleCopy = (row) => {
    alert(`Copiar reporte: ${row.id}`);
  };
  const handleDelete = (row) => {
    if(window.confirm(`¿Seguro que deseas eliminar el reporte ${row.id}?`)) {
      alert(`Reporte eliminado: ${row.id}`);
    }
  };

  // Paginación usando los datos de Redux
  const inicio = (pagina - 1) * cantidad;
  const fin = inicio + cantidad;
  const datosPagina = reportes.slice(inicio, fin);
  const totalPaginas = Math.ceil(reportes.length / cantidad);

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Titulo>Reportes</Titulo>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          mb: 4,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        {reportesDestacados.map((reporte, idx) => (
          <ReporteDestacadoBox key={idx} icon={reporte.icon} titulo={reporte.titulo} />
        ))}
      </Box>

      <TablaReportes
        datos={datosPagina}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2">Cantidad por página:</Typography>
        <FormControl size="small" sx={{ minWidth: 60 }}>
          <Select value={cantidad} onChange={handleChangeCantidad}>
            {[5, 10, 50, 100].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination
          count={totalPaginas}
          page={pagina}
          onChange={handleChangePagina}
          color="primary"
          shape="circular"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
}

export default Reports;