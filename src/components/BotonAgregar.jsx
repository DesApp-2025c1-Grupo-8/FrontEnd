import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8BAAAD',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#6B8A8D',
  },
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '8px 16px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

function BotonAgregar({ onClick, texto }) {
  return (
    <StyledButton
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      {texto}
    </StyledButton>
  );
}

export default BotonAgregar; 