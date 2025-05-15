import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

function TablaReportes({ datos, onView, onEdit, onCopy, onDelete }) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mb: 2,
        background: '#f6fffa',
        boxShadow: 'none',
        borderRadius: 0,
        border: 'none',
      }}
    >
      <Table>
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
            <TableCell>IDReporte</TableCell>
            <TableCell>Tipo de reporte</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Parámetros</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((row) => (
            <TableRow 
              key={row.id}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(139, 170, 173, 0.1)',
                },
              }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.parametros}</TableCell>
              <TableCell>
                <IconButton size="small" color="primary" onClick={() => onView && onView(row)}><VisibilityIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="primary" onClick={() => onEdit && onEdit(row)}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="primary" onClick={() => onCopy && onCopy(row)}><FileCopyIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete && onDelete(row)}><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaReportes; 