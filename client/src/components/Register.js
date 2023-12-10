import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Register = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
   const [email, setEmail] = useState('');
   const [msg, setMsg] = useState('');
   const navigate = useNavigate();

 
   const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username: username,
        email: email,
        password: password,
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
 

  

 

  return (
     
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
        <p className="has-text-centered">{msg}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            
            label="Password"
            type="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
           <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
             autoFocus
          /> 
         
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
             value={email}
            onChange={(e) => setEmail(e.target.value)}
             
            autoFocus
          />
          
         
           
          <Button
            type="button"
            fullWidth
            variant="contained"
             sx={{ mt: 3, mb: 2 }}
             onClick={handleRegister}
          >
            Register
          </Button>
          <Grid container>
             
            <Grid item>
              <Link to="/login" variant="body2">
                {"Have an account? Login."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
  )
}

export default Register;