import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';






const Dashboard = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
  
    // Redirect to the login page after logout
    navigate('/login');
  
  };
  return (
    <div>
       
        <h1>Welcome, {userInfo.username}!</h1>
        <button onClick={handleLogout}>Logout</button>

      
    </div>
  );
};

export default Dashboard;
