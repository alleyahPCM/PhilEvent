import React, { useEffect, useState } from 'react';
import NavBarAlt from '../components/NavBarAlt';
import Sidebar from '../components/Sidebar';
import { Grid } from '@mui/material';
import Dashboard from '../components/Dashboard';
import EventCalendar from '../components/EventCalendar';
import MyEvents from '../components/MyEvents';
import Settings from '../components/Settings';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' by default

  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        if (!res.data.valid) {
          navigate("/Login");
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });

    const pathname = location.pathname;
    if (pathname === '/Calendar') {
      setCurrentView('calendar');
    } else if (pathname === '/MyEvents') {
      setCurrentView('myevents');
    } else if (pathname === '/Settings') {
      setCurrentView('settings');
    }
  }, [navigate, location]);

  const handleSidebarClick = (view) => {
    setIsLoading(true);
    setCurrentView(view);
    setIsLoading(false);
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <NavBarAlt />
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
        <Grid container>
          <Grid item sm={2} style={{ backgroundColor: '#A59132' }}>
            <Sidebar onSidebarClick={handleSidebarClick} />
          </Grid>
          <Grid item sm={10}>
            {isLoading ? (
              <>
                <Skeleton height={150} style={{ marginBottom: 20 }} />
                <Skeleton height={150} style={{ marginBottom: 20 }} />
              </>
            ) : (
              <>
                {currentView === 'dashboard' && <Dashboard />}
                {currentView === 'calendar' && <EventCalendar />}
                {currentView === 'myevents' && <MyEvents />}
                {currentView === 'settings' && <Settings />}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserHome;