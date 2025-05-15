import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function ReporteDestacadoBox({ icon, titulo }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: 320,
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: '#2696a6',
        color: '#fff'
      }}
    >
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {titulo}
      </Typography>
    </Paper>
  );
}

export default ReporteDestacadoBox; 