import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GridViewIcon from '@mui/icons-material/GridView';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';


function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    return currentPath === path;
  };

  const iconStyle = (path) => ({
    color: isActive(path) ? '#2196f3' : 'inherit',
  });

  return (
    <AppBar position="static" elevation={0} sx={{ background: '#f6fffa', color: '#222', borderBottom: '2px solid #222' }}>
      <Toolbar sx={{ minHeight: 36, px: 2 }}>
        <LocalShippingIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Logística ACME S.R.L.
        </Typography>
        <Tooltip title="Inicio">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/"
            sx={iconStyle('/')}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Documentos">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/docs"
            sx={iconStyle('/docs')}
          >
            <AssignmentIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clientes">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/clients"
            sx={iconStyle('/clients')}
          >
            <PeopleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Destinos">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/destinations"
            sx={iconStyle('/destinations')}
          >
            <RoomIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reportes">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/reports"
            sx={iconStyle('/reports')}
          >
            <MenuBookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Varios">
          <IconButton 
            size="small" 
            color="inherit" 
            component={Link} 
            to="/varios"
            sx={iconStyle('/varios')}
          >
            <GridViewIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider sx={{ bgcolor: '#2196f3', height: 3 }} />
    </AppBar>
  );
}

export default NavBar;