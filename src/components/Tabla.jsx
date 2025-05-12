import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Tabla({ datos = [], onSearch, onEdit, onDelete }) {
  const [cantidad, setCantidad] = useState(10);
  const [pagina, setPagina] = useState(1);

  // Detectar si los datos tienen la columna estado
  const tieneEstado = datos.length > 0 && datos[0].estado !== undefined;

  const totalPages = Math.ceil(datos.length / cantidad);
  const inicio = (pagina - 1) * cantidad;
  const fin = inicio + cantidad;
  const datosPagina = datos.slice(inicio, fin);

  const handleChangePagina = (event, value) => {
    setPagina(value);
  };

  const handleChangeCantidad = (event) => {
    setCantidad(Number(event.target.value));
    setPagina(1);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: '#f6fffa',
        boxShadow: 'none',
        borderRadius: 0,
        border: 'none',
        mt: 2,
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              background: '#8BAAAD',
              '& th': {
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: '2px solid #444',
                color: '#222',
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            {tieneEstado && <TableCell>Estado</TableCell>}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datosPagina.map((item, idx) => (
            <TableRow>
              
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              {tieneEstado && <TableCell>{item.estado}</TableCell>}
              <TableCell>
                <IconButton size="small" title="Ver" onClick={() => onSearch(item)}>
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" title="Editar" onClick={() => onEdit(item)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" title="Eliminar" onClick={() => onDelete(item)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ m: 2 }}
      >
        <span style={{ fontWeight: 500 }}>Cantidad por página:</span>
        <Select
          value={cantidad}
          onChange={handleChangeCantidad}
          size="small"
        >
          {[5, 10, 50, 100].map(num => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
        <Pagination
          count={totalPages}
          page={pagina}
          onChange={handleChangePagina}
          color="primary"
          shape="circular"
        />
      </Stack>
    </TableContainer>
  );
}

export default Tabla;
