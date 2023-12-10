import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import Box from "@mui/material/Box";

  import CssBaseline from '@mui/material/CssBaseline';
 import Button from '@mui/material/Button';
 
 import Alert from '@mui/material/Alert';

 

const Navbar = () => {
     
   const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
  
    // Redirect to the login page after logout
    navigate('/login');
  
  };

  return (
    <AppBar position="static">
    <CssBaseline />
    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4">
        <h1>Welcome, {userInfo.username}!</h1>
      </Typography>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
  
  );
}
export default Navbar;