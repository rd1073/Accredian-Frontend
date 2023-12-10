
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
  const [identifier, setIdentifier] = useState(''); // Change to 'identifier'

    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

      
    const handleLogin = async () => {
      if (!identifier || !password) {
        console.log("please fill all the fields");
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
        console.log(data);
        console.log("login succesfull");
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
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
    </Container>
    
  )
}

export default Login

{/*import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../App.css';

const Login = () => {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState ('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [role, setRole] = useState(""); // Declare setRole

    axios.defaults.withCredentials = true;


     const navigate = useNavigate();
     

     const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Assuming 'input' and 'password' are state variables
            const response = await axios.post('http://localhost:5000/api/login', {
                input: input,
                password: password
            });
    
            // Check if the response contains a 'message' property
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token)

                // Assuming you want to access 'response.data.message' instead of 'response.data[0].message'
                setLoginStatus(true);
            }
        } catch (error) {
             console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/login");
                if (response.data.loggedIn === true) {
                    setRole(response.data.user[0].role);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchData();
    }, []);

    const userAuthenticated = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/isUserAuth", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          });
      
          console.log(response);
        } catch (error) {
          console.error("Error fetching user authentication status:", error);
        }
      };
      
    
  return (
    
      <div className="login">
           <h1>Login</h1>
           <input type="text" placeholder="Username or Email"
                       onChange={(e) => setInput(e.target.value)}
                       value={input}

                       /> <br/>
           <input type="password" placeholder="Password…" 
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}

                       />
           <button onClick={handleLogin}>Login</button>
           <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              <h1> {loginStatus}</h1>
              {loginStatus && (
        <button>Check if authenticated</button>
      )}

        </div>
    
  )
}

export default Login*/}

