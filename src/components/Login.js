import React, { useState } from 'react'
import Base from './Base'
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useHistory} from 'react-router-dom';
import { URL } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Auth-App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  
  const defaultTheme = createTheme();


const Login = () => {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const history = useHistory();
    // const navigate = useNavigate();


    const handleSubmit = async(event) => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
  
          let email = data.get('email');
          let password = data.get('password');
             
        let res = await axios.post(`${URL}/users/signin`, {
          email,
          password
          })
          if(res.status === 200){
            history.push("/dashboard");  //navigate("/dashboard")
            sessionStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
          }
        
      } catch (error) {
        toast.error(error.response.data.message);
      }
        
      };

  return (
    <Base>
    

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // onChange={(e)=>setEmail(e.target.value)}
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
                autoComplete="current-password"
                // onChange={(e)=>setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                style={{cursor:"pointer"}}
                required
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{cursor:"pointer"}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link style={{cursor:"pointer"}} onClick={()=>history.push("/confirm-mail")} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{cursor:"pointer"}} onClick={()=>history.push("/signup")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    </Base>
  )
}

export default Login