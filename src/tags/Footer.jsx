import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#8BAAAD',
  color: '#fff',
  padding: theme.spacing(2, 0),
  marginTop: 'auto',
  width: '100%',
  position: 'relative',
  bottom: 0,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    color: '#f6fffa',
    textDecoration: 'underline',
  },
}));

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            © {new Date().getFullYear()} Logística ACME S.R.L. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <StyledLink href="#" variant="body2">
              Política de Privacidad
            </StyledLink>
            <StyledLink href="#" variant="body2">
              Términos de Uso
            </StyledLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
}

export default Footer;