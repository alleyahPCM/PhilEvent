import React from "react";
import NavBar from "../components/NavBar.jsx";
import { Col } from 'react-bootstrap';

import Sidebar from "../components/Sidebar.jsx";

function Interaction() {
    return (
        <div className="main-container">
            <NavBar />
            <div className="sidebar-content-container">
                <Col sm={1} className="sidebar">
                    <Sidebar />
                </Col>
                <Col sm={8}>
                Content Here
                </Col>
            </div>
      
        </div>
    );
}
export default Interaction;