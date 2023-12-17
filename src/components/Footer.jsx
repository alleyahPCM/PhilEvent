import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Email, Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import LogoWhite from '../img/logo-white.png';

const FooterContainer = styled.div`
  background-color: #A59132;
`

const LeftFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const RightFooter = styled.div`
  flex: 1;
  text-align: right;
  color: white;
`
const LogoText = styled.h2`
    font-weight: bold;
    color: white;
    margin-left: 5px;
    margin-top: 5px;
`

const EmailContainer = styled.div`
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
`

const SocialContainer = styled.div`
    color: white;
    display: flex;
`

const SocialIcon = styled.div`
  margin-right: 5px;
`

const Title = styled.h4`
  margin-botton: 5px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  margin-bottom: 2px;
`
const SubContainer = styled.div`
  display: flex;
`
const CopyrightContainer = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container style={{paddingTop: 30, paddingBottom: 30}}>
        <SubContainer>
          <LeftFooter>
            <div style={{display: 'flex'}}>
              <img src={LogoWhite} alt='logo' style={{width: 40, height: 40}}/>
              <LogoText>PhilEvent.</LogoText>
            </div>
            <EmailContainer>
              <Email/>
              <span style={{ marginLeft: 5}}>PhilEvent@gmail.com</span>
            </EmailContainer>
            <SocialContainer>
                <SocialIcon>
                  <Facebook/>
                </SocialIcon>
                <SocialIcon>
                  <Twitter/>
                </SocialIcon>
                <SocialIcon>
                  <LinkedIn/>
                </SocialIcon>
            </SocialContainer>
          </LeftFooter>
          <RightFooter>
            <Title>Links</Title>
            <List>
              <ListItem>About Us</ListItem>
              <ListItem>Contact Us</ListItem>
              <ListItem>Privacy Policy</ListItem>
            </List>
          </RightFooter>
        </SubContainer>
        <hr/>
        <CopyrightContainer>
          <span>©2023 PhilEvent.</span>
        </CopyrightContainer>
      </Container>
    </FooterContainer>
  )
}

export default Footer