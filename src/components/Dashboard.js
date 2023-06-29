import React, { useCallback, useEffect, useState } from 'react'
import Base from './Base'
import { Button, Card, CardActionArea, CardContent, CardMedia, CssBaseline, Grid, Table, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../App';
import {read, utils, writeFileXLSX} from 'xlsx';

const defaultTheme = createTheme();

const Dashboard = () => {
  let token = sessionStorage.getItem('token')
  let [leads,setLeads] = useState([])
  let [cards,setCards] = useState([])
  let [selectedStatus,setSelectedStatus] = useState("")
  let history = useHistory()

  let getData = async()=>{
      try {
          let res = await axios.get(`${URL}/dashboard`,{
              headers:{
                  authorization:`Bearer ${token}`
              }
          })
          if(res.status===200)
          {
              setCards(res.data.leads)
          }
      } catch (error) {
          toast.error(error.response.data.message)
          if(error.response.status===401)
              handleLogout()
      }
  }

  let loadStatusData = async(status)=>{
      try {
          setSelectedStatus(status)
          let res = await axios.get(`${URL}/dashboard-list-items/${status}`,{
              headers:{
                  authorization:`Bearer ${token}`
              }
          })
          if(res.status===200)
          {
              setLeads(res.data.leads)
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

  const exportFile = useCallback(() => {
      const ws = utils.json_to_sheet(leads);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, `${selectedStatus} Leads.xlsx`);
    }, [leads]);

  useEffect(()=>{
      if(token)
          getData()
      else
          handleLogout()
  },[])

  return (
    <Base>
     <Typography component="h2" variant="h6" color="black" gutterBottom>
      Data
    </Typography>
    <div className='card-wrapper'>
{
    cards.map((e,i)=>{
    <Card sx={{ maxWidth: 345 }} onClick={()=>{loadStatusData(e._id)}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {e._id} &nbsp;&nbsp; {e.count}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  })};
  </div>

  <Button variant='outlined' onClick={()=>exportFile()} style={{width:"100px", position: "initial"}}>Export</Button>  
<br/><br/>
  <div className='table-wrapper'>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Created By</th>
            <th>Created At</th>

            </tr>
        </thead>
        <tbody>
            {
                leads.map((e,i)=>{
                    return <tr key={i} style={{cursor:"pointer"}}>
                        <td>{i+1}</td>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.mobile}</td>
                        <td>{e.course}</td>
                        <td>{e.createdBy}</td>
                        <td>{new Date(e.createdAt).toLocaleDateString('en-UK')}</td>
                    </tr>
                })
            }
            
        </tbody>
        </Table>
    </div>
    </Base>
  )
}

export default Dashboard