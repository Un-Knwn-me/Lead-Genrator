import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {useHistory} from 'react-router-dom';



const Base = ( {title, description, children} ) => {

    const history = useHistory();

    const handleLogout = async()=>{
      sessionStorage.clear();
      history.push('/');
    }
    
  return (
    <div  className="main-division">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" onClick={()=>history.push("/dashboard")}>Dashboard</Button>
        <Button color="inherit" onClick={()=>history.push("/email")}>E-mail</Button>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lead Genrator
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>

<header>
<h1>{title}</h1>
</header>
<main>
<h2>{description}</h2>
<div>{children}</div>
</main>

<div className="footer">
  <Box
    sx={{
      width: "100%",
      height: "auto",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    }}
  >
    <footer className="footer">
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="white" variant="h5">
            Auth-App
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="white" variant="subtitle1">
            {`${new Date().getFullYear()} | React | Material UI | React Router`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
    </footer>

  </Box>
</div>
</div>
  )
}

export default Base