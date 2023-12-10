import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';





const Dashboard = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

   
  
  return (
    <div>
      <Navbar />
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4">
          <h1>Username: {userInfo.username}</h1>
        </Typography>
        <Typography variant="h4">
          <h1>Email: {userInfo.email}</h1>
        </Typography>
        <Typography variant="h4">
          <h1>User ID: {userInfo.userId}</h1>
        </Typography>
      </Box>
    </Box>
       

      
    </div>
  );
};

export default Dashboard;
