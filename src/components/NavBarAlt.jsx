import { useState } from 'react';
import { Container, Nav, Navbar, Form, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { AccountCircle, NotificationsOutlined, Search } from '@mui/icons-material';
import LogoGreen from '../img/logo-green.png';
import Badge from '@mui/material/Badge';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoText = styled.h2`
    font-weight: bold;
    color: #A59132;
    margin-left: 5px;
    margin-top: 5px;
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

const CustomBadge = styled(Badge)(({ theme }) => ({
    cursor: 'pointer',
    '& .MuiBadge-badge': {
      backgroundColor: '#DA7422', // Replace 'orange' with your desired color
      color: 'white', // Text color of the badge
    },
}));

const CustomDropdownToggle = styled(Dropdown.Toggle)`
    &::after {
        display: none; /* Hide the arrow icon */
    }
`;

const CustomItem = styled(Dropdown.Item)`
    &:active {
        background-color: #DA7422 !important;
    }
`

const NavBarAlt = () => {
    const isSmallScreen = useMediaQuery('(max-width: 995px)'); // Change the breakpoint as needed

    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserOption, setShowUserOption] = useState(false);

    const handleNotificationsToggle = () => {
      setShowNotifications(!showNotifications);
    };

    const handleUserOptionToggle = () => {
        setShowUserOption(!showUserOption);
    };

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/logout");
            window.location.pathname === "/" ? window.location.reload() : navigate("/");
        } catch (error) {
            console.error("Logout failed:", error.response.data.message);
        }
    };


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
                    <Nav.Link href="/UserHome"><Link>Home</Link></Nav.Link>
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
                {isSmallScreen ? (
                    <>
                    <Nav.Link href="#notifications"><Link>Notifications</Link></Nav.Link>
                    <Nav.Link href="/Settings"><Link>Settings</Link></Nav.Link>
                    <Nav.Link onClick={handleLogout}><Link>Logout</Link></Nav.Link>
                    </>
                ) : (
                    <>
                    <CustomBadge badgeContent={4} onClick={handleNotificationsToggle}>
                        <NotificationsOutlined color="action" />
                    </CustomBadge>
                    <Dropdown align="end" show={showNotifications} onClose={() => setShowNotifications(false)}>
                        <CustomDropdownToggle as={CustomBadge} id="notifications-dropdown" />
                        <Dropdown.Menu>
                        <CustomItem href="#notification1">Notification 1</CustomItem>
                        <CustomItem href="#notification2">Notification 2</CustomItem>
                        <CustomItem href="#notification3">Notification 3</CustomItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <CustomBadge onClick={handleUserOptionToggle} style={{ marginLeft: '10px',}}>
                        <AccountCircle color="action"/>
                    </CustomBadge>
                    <Dropdown align="end" show={showUserOption} onClose={() => setShowUserOption(false)}>
                        <CustomDropdownToggle as={CustomBadge} id="user-options-dropdown" />
                        <Dropdown.Menu>
                        <CustomItem href="/Settings">Settings</CustomItem>
                        <CustomItem onClick={handleLogout}>Logout</CustomItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBarAlt