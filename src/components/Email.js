import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { URL } from '../App'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button, Stack, TextField, Typography } from '@mui/material'
import Base from './Base'
import SendIcon from '@mui/icons-material/Send';

const Email = () => {
    let [subject,setSubject] = useState("")
    let [message,setMessage] = useState("")
    let token = sessionStorage.getItem('token')
    let history = useHistory()

    let sendEmail = async()=>{
        try {
            let res = await axios.post(`${URL}/send-email`,{subject,message},{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            if(res.status===200)
            {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                handleLogout()
        }
    }

    let handleLogout = async()=>{
        sessionStorage.clear()
        history.push('/login')
    }
  return (
    <Base>
    <div style={{alignItems: 'center'}}>
    <Typography component="h2" variant="h6" color="black" gutterBottom>
      Mail Component
    </Typography>
    <br/>
    <Stack
      component="form"
      sx={{
        width: '60%',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
      style={{marginLeft:"20%"}}
    >
        <TextField 
        id="outlined-basic margin-normal" 
        label="Subject" 
        variant="outlined"
        onClick={(e)=>setSubject(e.target.value)} 
        required
        />
        <TextField
          id="outlined-multiline-static margin-normal"
          label="Body"
          onClick={(e)=>setMessage(e.target.value)}
          required
          multiline
          rows={8}
        />
        <Button variant="contained" style={{width:"11em"}} onClick={sendEmail} endIcon={<SendIcon />}>
        Send Email
      </Button>
        </Stack>
    </div>
    </Base>
  )
}

export default Email