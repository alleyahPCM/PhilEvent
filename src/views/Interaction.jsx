import React from "react";
import NavBar from "../components/NavBar.jsx";
import { Col } from 'react-bootstrap';

import Sidebar from "../components/Sidebar.jsx";
import Events from "../components/Events.jsx";

function Interaction() {
    return (
        <div className="main-container">
            <NavBar />
            <div className="sidebar-content-container">
                <Col sm={2} className="sidebar">
                    <Sidebar />
                </Col>
                <Col sm={10} style={{ padding: '0 1.5em' }}>
                    <div class="separator" style={{ fontSize: '23px' }}>My Upcoming Events</div>
                    <div className="justify-content-center" style={{ flexFlow: 'wrap', padding: '1em 4.5em', display: "flex" }}>
                        <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                            name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                        <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                            name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    </div>
                </Col>
            </div>

        </div>
    );
}
export default Interaction;