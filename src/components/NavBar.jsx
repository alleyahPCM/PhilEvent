import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';
import LogoGreen from '../img/logo-green.png';

const LogoText = styled.h2`
    font-weight: bold;
    color: #A59132;
    margin-left: 5px;
    margin-top: 5px;
`
const LoginButton = styled(Button)`
    width: 90px;
    color: #DA7422;
    border-radius: 45px;
    background-color: transparent;
    border: 1px solid #DA7422;

    &:hover {
        background-color: #f9f2db;
        border: 1px solid #DA7422;
        color: #DA7422;
    }

    &:active {
        background-color: #f9f2db !important;
        border: 1px solid #DA7422 !important;
        color: #DA7422 !important;
    }
`
const SignUpButton = styled(Button)`
    width: 90px;
    border-radius: 45px;
    background-color: #DA7422;
    border: none;

    &:hover {
        background-color: #D06023;
    }

    &:active {
        background-color: #D06023 !important;
    }
`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 45px;
  margin-right: 10px;
`;

const SearchIcon = styled(Search)`
  margin-right: 5px;
  color: gray;
  fontSize: 18px;
`;

const SearchBar = styled(Form.Control)`
    padding: 6px 0px 6px 12px;
    background-color: transparent;

    &:focus {
        background-color: transparent;
        outline: none !important;
        box-shadow: none;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
    }
`

const Link = styled.span`
    color: #A59132;
    font-size: 18px;

    &:hover {
        color: #846823;
    }
`

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'white', borderBottom: '1px solid #ced4da' }}>
        <Container>
            <Navbar.Brand href="/" style={{paddingTop: 10, display: 'flex'}}>
                <img src={LogoGreen} alt='logo' style={{width: 40, height: 40}}/>
                <LogoText>PhilEvent.</LogoText>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#events"><Link>Events</Link></Nav.Link>
                    <Nav.Link href="/Places"><Link>Places</Link></Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <SearchContainer>
                        <SearchBar
                            type="search"
                            placeholder="Search"
                            className="border-0"
                            aria-label="Search"
                        />
                        <SearchIcon />
                    </SearchContainer>
                </Form>
                <Nav>
                    <Nav.Link href="/Login"><LoginButton>Login</LoginButton></Nav.Link>
                    <Nav.Link href="/Signup"><SignUpButton>Sign Up</SignUpButton></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar