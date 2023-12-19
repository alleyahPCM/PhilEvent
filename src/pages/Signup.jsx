import React, { useEffect } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import LogoWhite from '../img/logo-white.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px;
`

const Logo = styled.img`
  opacity: 0.8;
  width: 40px;
  height: 40px;
`;

const LogoText = styled.h2`
  font-weight: bold;
  color: white;
  margin-left: 5px;
  margin-top: 5px;
  opacity: 0.8;
`;

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  padding: 15px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  /* Add any other link-related styles here */
`;

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        if (res.data.valid) {
          navigate("/UserHome")
        }
      })
      .catch(err => console.log(err))
  }, [navigate])
  
  return (
    <div className='signup-background' style={{minHeight: '100vh', height: '100%', display: 'flex', alignIttems: 'center',
    justifyContent: 'center'}}> 
        <StyledLink href="/">
            <LogoContainer>
                <Logo src={LogoWhite} alt='logo-white'/>
                <LogoText>PhilEvent.</LogoText>
            </LogoContainer>
        </StyledLink>
        <SignupContainer>
            <SignUpForm/>
        </SignupContainer>
    </div>

  )
}

export default Signup