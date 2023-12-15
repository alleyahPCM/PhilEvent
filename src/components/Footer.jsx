import React from 'react';
import logo from '../img/logo_peach.png'

import { BiMailSend } from 'react-icons/bi';
import facebook from "../img/facebook_footer.png";
import linkedin from "../img/linkedin_footer.png";
import twitter from "../img/twitter_footer.png";

function Events() {
    return (
        <footer style={{ background: '#A59132', padding: '2em 1em .2em 1em', color: '#FFF3EA' }}>
            <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col'>
                    <img src={logo} style={{ width: '40%', marginBottom: '10px' }} alt="logo" /><br />
                    <BiMailSend style={{ fontSize: '26px', margin: '0 10px 5px 10px' }} /> <span style={{ fontSize: '23px' }}>PhilEvent@gmail.com</span> <br />
                    <div style={{ marginTop: '15px' }}>
                        <a href='https://www.facebook.com/'><img src={facebook} alt="facebook" style={{ width: '5%' }} /></a>
                        <a href='https://www.linkedin.com/'><img src={linkedin} alt="linkedin" style={{ width: '5%' }} /></a>
                        <a href='https://twitter.com/'><img src={twitter} alt="twitter" style={{ width: '5%' }} /></a>
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex flex-column' style={{ float: 'right', padding: '10px', fontSize: '23px', textAlign: 'right'}}>
                        <a href='/aboutUs'>About Us</a>
                        <a href='/contactUs'>Contact Us</a>
                        <a href='/privacyPolicy'>Privacy Policy</a>
                    </div>
                </div>
            </div>
            <div style={{ border: '2px solid' }} />
            <p className="text-center" style={{ fontSize: '18px', marginTop: '15px' }}>&copy;2023 PhilEvent.</p>
        </footer>
    );
}

export default Events;