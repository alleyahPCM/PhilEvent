import React, {useEffect} from 'react';
import NavBarAlt from '../components/NavBarAlt';
import Sidebar from '../components/Sidebar';
import { Grid } from '@mui/material';
import Dashboard from '../components/Dashboard';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        if (!res.data.valid) {
          navigate("/Login")
        }
      })
      .catch(err => console.log(err))
  }, [navigate])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBarAlt />
      <div style={{ flex: 1, display: 'flex' }}>
        <Grid container>
          <Grid item sm={2} style={{ backgroundColor: '#A59132' }}>
            <Sidebar />
          </Grid>
          <Grid item sm={10}>
            <Dashboard/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserHome;
