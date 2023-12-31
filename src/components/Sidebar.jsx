import { MeetingRoom, Settings } from "@mui/icons-material"
import { Container, Typography } from "@mui/material"
import { BsCalendarWeekFill, BsCalendarHeartFill } from "react-icons/bs";
import styled from 'styled-components';
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SidebarItem = styled.a`
    display: flex;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: flex-start;
    color: white;
    text-decoration: none;

    &:not(.active):hover {
        color: #f9f2db;
        cursor: pointer;
    }

    &.active {
        color: #625834;
        cursor: pointer;
    }

    &.logout { /* New class added for Logout link */
        color: white;
    }

    &.logout:hover { /* Hover color for Logout link */
        color: #f9f2db;
    }

    @media (max-width: 900px) {
        justify-content: center;
    }
`

const SideContainer = styled(Container)`
    padding: 30px;
    height: calc(100vh - 70px); /* Adjust this value to match the navbar height */
    position: sticky;
    top: 70px; /* Adjust this value to match the navbar height */
    left: 0;
    overflow-y: auto; /* Enable vertical scrolling when content exceeds viewport height */
`

const HiddenTypography = styled(Typography)`
    padding-left: 5px;
    @media (max-width: 900px) {
        display: none;
    }
`

const Sidebar = ({ onSidebarClick }) => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState('dashboard');

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/Calendar') {
            setCurrentPath('calendar');
        } else if (pathname === '/MyEvents') {
            setCurrentPath('myevents');
        } else if (pathname === '/Settings') {
            setCurrentPath('settings');
        } else {
            setCurrentPath('dashboard');
        }
    }, [location]);

    const isActive = (path) => {
        return path === currentPath ? 'active' : '';
    };

    const handleClick = (view) => {
        setCurrentPath(view)
        onSidebarClick(view);
    };

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/logout");
            navigate("/")
        } catch (error) {
            console.error("Logout failed:", error.response.data.message);
        }
    };

    return (
        <SideContainer>
            <div className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                <div>
                    <SidebarItem onClick={() => handleClick('dashboard')} className={isActive('dashboard')}>
                        <AiFillHome style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Home</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem onClick={() => handleClick('calendar')} className={isActive('calendar')}>
                        <BsCalendarWeekFill style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Calendar</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem onClick={() => handleClick('myevents')} className={isActive('myevents')}>
                        <BsCalendarHeartFill style={{ width: 20, height: 20 }} />
                        <HiddenTypography>My Events</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem onClick={() => handleClick('settings')} className={isActive('settings')}>
                        <Settings style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Settings</HiddenTypography>
                    </SidebarItem>
                </div>

                <SidebarItem onClick={handleLogout} className={`logout ${isActive('logout')}`}>
                    <MeetingRoom style={{ width: 20, height: 20 }} />
                    <HiddenTypography>Logout</HiddenTypography>
                </SidebarItem>
            </div>
        </SideContainer>
    );
}

export default Sidebar
