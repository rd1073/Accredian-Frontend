import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';


const Register = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
   const [email, setEmail] = useState('');
   const [msg, setMsg] = useState('');
   const [alert, setAlert] = useState(null); // State to manage the alert
   const [alertMsg, setAlertMsg] = useState('');

   const navigate = useNavigate();

 
   const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmpassword || !email) {
      console.log("please fill all the fields");
      setAlert(
          <Alert severity="info" onClose={() => setAlert(null)}>Please fill in all the fields</Alert>
                
        );
       return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: username,
        email: email,
        password: password,
      });
      
      
      setAlert(
        <Alert severity="success" onClose={() => setAlert(null)}>Registration Succesfull<br />
        <Link to="/login" variant="body2">
          {"Login."}
      </Link>
      </Alert>
              
      );
    } catch (error) {
      setAlert(
        <Alert severity="warning" onClose={() => setAlert(null)}>
          Email already exists</Alert>
              
      );
      console.error('Registration failed:', error);
      if (error.response && error.response.data.msg) {
        // Display an alert with the error message
        setAlertMsg(error.response.data.msg);
      }
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
    <Container component="main" maxWidth="sm">
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

export default Register;
 