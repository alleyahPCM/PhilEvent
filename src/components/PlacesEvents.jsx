import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchdata } from '../data';
import Event from './Event';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
`

const EventsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; /* Align items to the left */
`

const MoreLink = styled.a`
    text-decoration: none;
    color: #DA7422;

    &:hover {
        color: #D06023;
    }

`

const PlacesEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchdata();
          setEvents(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Function to filter events by city
    const getEventsByCity = (city) => {
        return events.filter((event) => event.city === city).slice(0, 8);
    };

  return (
    <Container style={{marginTop: 30, marginBottom: 50}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Title>Cebu</Title>
           <MoreLink href='#'><span>View More...</span></MoreLink>
        </div>
        <hr/>
        <EventsContainer>
            {getEventsByCity('Cebu').map((item) => (
            <Event item={item} key={item.id} />
            ))}
        </EventsContainer>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Title>Manila</Title>
           <MoreLink href='#'><span>View More...</span></MoreLink>
        </div>
        <hr/>
        <EventsContainer>
            {getEventsByCity('Manila').map((item) => (
            <Event item={item} key={item.id} />
            ))}
        </EventsContainer>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Title>Davao</Title>
           <MoreLink href='#'><span>View More...</span></MoreLink>
        </div>
        <hr/>
        <EventsContainer>
            {getEventsByCity('Davao').map((item) => (
            <Event item={item} key={item.id} />
            ))}
        </EventsContainer>
    </Container>
  )
}

export default PlacesEvents