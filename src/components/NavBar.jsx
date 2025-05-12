import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GridViewIcon from '@mui/icons-material/GridView';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';


function NavBar() {
  return (
    <AppBar position="static" elevation={0} sx={{ background: '#f6fffa', color: '#222', borderBottom: '2px solid #222' }}>
      <Toolbar sx={{ minHeight: 36, px: 2 }}>
        <LocalShippingIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Logística ACME S.R.L.
        </Typography>
        <IconButton size="small" color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <IconButton size="small" color="inherit" component={Link} to="/docs">
          <AssignmentIcon />
        </IconButton>
        <IconButton size="small" color="inherit" component={Link} to="/clients">
          <PeopleIcon />
        </IconButton>
        <IconButton size="small" color="inherit" component={Link} to="/destinations">
          <RoomIcon />
        </IconButton>
        <IconButton size="small" color="inherit" component={Link} to="/reports">
          <MenuBookIcon />
        </IconButton>
        <IconButton size="small" color="inherit" component={Link} to="/varios">
          <GridViewIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ bgcolor: '#2196f3', height: 3 }} />
    </AppBar>
  );
}

export default NavBar;