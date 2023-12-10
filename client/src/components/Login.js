import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/login', {
                email:email,
                password: password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


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
          Login
        </Typography>
        <p className="has-text-centered">{msg}</p>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username or Email"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
           
          <Button
            type="button"
            fullWidth
            variant="contained"
             sx={{ mt: 3, mb: 2 }}
             onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container>
             
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
  )
}

export default Login