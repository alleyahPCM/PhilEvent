import React from "react";
import NavBar from "../components/NavBar.jsx";
import Events from "../components/Events.jsx";
import WebBanner from "../components/WebBanner.jsx";
import Footer from "../components/Footer.jsx"

import Dropdown from 'react-bootstrap/Dropdown';

function Home() {
    return (
        <main>
            <NavBar />

            <WebBanner />

            <div style={{padding: '0 1em'}}>
                <div class="separator" style={{fontSize: '46px'}}>Popular Events</div>

                <div className="filter">
                    <span>Date: </span>
                    <Dropdown className="me-5">
                        <Dropdown.Toggle id="dropdown-basic" style={{ background: '#da7422', borderColor: '#da7422', fontWeight: 'bold' }}>
                            Select Date
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>This week</Dropdown.Item>
                            <Dropdown.Item>Last Week</Dropdown.Item>
                            <Dropdown.Item>Last Month</Dropdown.Item>
                            <Dropdown.Item  >Last Year</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <span>Location: </span>
                    <Dropdown className="me-5">
                        <Dropdown.Toggle id="dropdown-basic" style={{ background: '#da7422', borderColor: '#da7422', fontWeight: 'bold' }}>
                            Select Location
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Cebu</Dropdown.Item>
                            <Dropdown.Item>Manila</Dropdown.Item>
                            <Dropdown.Item>Leyte</Dropdown.Item>
                            <Dropdown.Item >Ila Aliya</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="justify-content-center" style={{ flexFlow: 'wrap', padding: '1em 4.5em', display: "flex" }}>
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg'
                        name='Dota TI' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg'
                        name='Twitch Con' date='Aug 2023' loc='Ila aliya' />
                    <Events img='https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg'
                        name='CS Majors' date='Aug 2023' loc='Ila aliya' />

                </div>
            </div>
            <Footer />
        </main>
    );
}

export default Home;
