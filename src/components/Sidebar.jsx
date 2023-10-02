import React from 'react';
import { Nav } from 'react-bootstrap';
import { BiHome,  BiCalendar, BiCalendarHeart, BiCog, BiDoorOpen} from "react-icons/bi";

function Sidebar() {
    return (
        <Nav defaultActiveKey="/home" className="flex-column main-sidebar d-flex">    
            <Nav.Item>
                <Nav.Link href="/home" className='sidebar-link'>
                    <BiHome className="sidebar-icons" /> 
                    <span class="sidebar-text"> Home</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/calendar" className='sidebar-link' >
                    <BiCalendar className="sidebar-icons" /> 
                    <span class="sidebar-text"> Calendar </span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/myEvents" className='sidebar-link'>
                    <BiCalendarHeart className="sidebar-icons" /> 
                    <span class="sidebar-text"> My Events </span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/settings" className='sidebar-link'>
                    <BiCog className="sidebar-icons" /> 
                    <span class="sidebar-text"> Settings </span>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className="mt-auto">
                <Nav.Link href="/logout" className='sidebar-link'>
                    <BiDoorOpen className="sidebar-icons" /> 
                    <span class="sidebar-text"> Log out </span>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Sidebar;