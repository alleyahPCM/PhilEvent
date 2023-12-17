import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { fetchEventById } from '../data';
import { Grid } from '@mui/material';

const Title = styled.h2`
  font-weight: bold;
  color: #da7422;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
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
const EventLink = styled.a`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
    text-decoration: underline;
  }
`

const EventTemplate = () => {
  const {id} = useParams();

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const data = await fetchEventById(id);
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchDataById();
  }, [id]);

  return (
    <div>
    {eventData ? (
      <div>
        <div style={{ height: 300 }}>
          <CoverImg src={eventData.img} alt="event" />
        </div>
        <Container style={{ marginTop: 30 }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Title>{eventData.title}</Title>
              <Text>{eventData.city}</Text> <Text> | </Text>
              <Text>{eventData.time}</Text> <br />
              <Text>{eventData.address}</Text> <br /><br />

              <Text style={{color: '#da7422'}}>{eventData.price}</Text><br/>
              <p style={{fontSize: '18px', textAlign: 'justify'}}>{eventData.description}</p><br/>
              <EventLink href={eventData.link}><Text>{eventData.link}</Text></EventLink>
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', padding: '10px' }}>
              <StyledButton>
                <BiCalendarPlus style={{ fontSize: '24px' }} />
              </StyledButton>{' '}
              <StyledButton>
                <AiFillHeart style={{ fontSize: '24px' }} />
              </StyledButton>{' '}
            </Grid>
          </Grid>
        </Container>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  );
};

export default EventTemplate;
