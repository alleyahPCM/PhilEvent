import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { AiOutlineSearch } from "react-icons/ai";
import logo from "../img/logo_green.png";

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow">
            <Container fluid>
                <Navbar.Brand href="#" style={{ width: '13%' }} className="me-3"><img src={logo} alt="PhilEvents" style={{ width: '100%' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', paddingTop: '5px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1"><b>Events</b></Nav.Link>
                        <Nav.Link href="#action2"><b>Places</b></Nav.Link>
                    </Nav>
                    <Form className="d-flex me-5">
                        <InputGroup >
                            <FormControl type="search" placeholder="Search" />
                            <InputGroup.Text className="bg-white">
                                <AiOutlineSearch />
                            </InputGroup.Text>
                        </InputGroup>

                    </Form>
                    <a href='login' className='me-4' style={{ textDecoration: 'none', color: '#a59132' }}>Login</a>
                    <Button className='me-4 rounded-pill' style={{ padding: '0.5em 1.5em', backgroundColor: '#DA7422', borderColor: '#DA7422', color: '#fff3ea'}}>Sign Up</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;