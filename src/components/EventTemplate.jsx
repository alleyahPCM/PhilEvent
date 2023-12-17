import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';

const Title = styled.h2`
  font-weight: bold;
  color: #da7422;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
    padding: 10px;
    border: 1px solid gray;
    background-color: transparent;
    margin-left: 5px;
    color: black;

    &:hover, &:focus {
        background-color: #da7422 !important;
        border: 1px solid #da7422 !important;
        color: white !important;
    }

    &:active {
        background-color: #D06023 !important;
        border: 1px solid #D06023 !important;
        color: white !important;
    }
`

const Text = styled.span`
    font-size: 18px;
`

const EventTemplate = () => {
  return (
    <div>
      <div style={{ height: 300 }}>
        <CoverImg src="https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg" alt="event" />
      </div>
      <Container style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Title>Title</Title>
          <Text>Location</Text> <Text> | </Text>
          <Text>Time</Text> <br />
          <Text>Address</Text> <br /><br />

          <Text style={{color: '#da7422'}}>Price</Text><br/>
          <p style={{fontSize: '18px'}}>Description</p><br/><br/>
          <Text>Link Here</Text>
        </div>
        <div>
          <StyledButton>
            <BiCalendarPlus style={{ fontSize: '24px' }} />
          </StyledButton>{' '}
          <StyledButton variant="danger">
            <AiFillHeart style={{ fontSize: '24px' }} />
          </StyledButton>{' '}
        </div>
      </Container>
    </div>
  );
};

export default EventTemplate;
