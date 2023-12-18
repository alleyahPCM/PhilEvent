import React from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import LogoWhite from '../img/logo-white.png';

const SignupContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  return (
    <div>
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