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

    @media (max-width: 900px) {
        justify-content: center;
    }
`

const SideContainer = styled(Container)`
    padding: 30px;
    height: 100%;
`

const HiddenTypography = styled(Typography)`
    padding-left: 5px;
    @media (max-width: 900px) {
        display: none;
    }
`

const Sidebar = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const isActive = (path) => {
        return path === currentPath ? 'active' : '';
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
                    <SidebarItem href="/UserHome" className={isActive('/UserHome')}>
                        <AiFillHome style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Home</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem href="/Calendar" className={isActive('/Calendar')}>
                        <BsCalendarWeekFill style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Calendar</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem href="/MyEvents" className={isActive('/MyEvents')}>
                        <BsCalendarHeartFill style={{ width: 20, height: 20 }} />
                        <HiddenTypography>My Events</HiddenTypography>
                    </SidebarItem>
                    <SidebarItem href="/Settings" className={isActive('/Settings')}>
                        <Settings style={{ width: 20, height: 20 }} />
                        <HiddenTypography>Settings</HiddenTypography>
                    </SidebarItem>
                </div>

                <SidebarItem onClick={handleLogout}>
                    <MeetingRoom style={{ width: 20, height: 20 }} />
                    <HiddenTypography>Logout</HiddenTypography>
                </SidebarItem>
            </div>
        </SideContainer>
    );
}

export default Sidebar
