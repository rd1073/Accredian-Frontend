
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
 
const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Change to 'identifier'

    const [password, setPassword] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const [alert, setAlert] = useState(null); // State to manage the alert

    const navigate = useNavigate();

      
    const handleLogin = async () => {
      if (!identifier || !password) {
        console.log("please fill all the fields");
        setAlert(
            <Alert severity="info" onClose={() => setAlert(null)}>Please fill in all the fields</Alert>
                  
          );
         return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/login",
          {
          
            identifier,
            password,
            
          },
          config
        );
        if (data.msg) {
            setAlertMsg(data.msg);
            setAlert(
                <Alert severity="info" onClose={() => setAlert(null)}>{data.msg}</Alert>
                      
              );
            return;
          }
        console.log(data);
        console.log("login succesfull");
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        setAlert(
            <Alert severity="error" onClose={() => setAlert(null)}>Invalid Credentials</Alert>
                  
          );
       }

    };
  


  return (
    <div
    style={{
      backgroundImage: `url(https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/bokeh-effect/bokeh_P3a_690x450.jpg.img.jpg)`,
      backgroundSize: 'cover',
      height: '100vh', // Adjust the height as needed
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
  <Container component="main" maxWidth="sm"  >
      <Box
        sx={{
            backgroundColor: 'rgba(255, 255, 255, 010)',

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
         
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username or Email"
            name="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
      <br />
      <br />
       
    </Container>
    <Box
      sx={{
        position: 'absolute',
        bottom: 16, // Adjust the distance from the bottom as needed
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {alert}
    </Box>

    </div>
  )
}

export default Login

 

