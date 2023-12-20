import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

import Event from './Event-User';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`
const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const MyEvents = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/userevents")
      .then(res => {
        setUserEvents(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  const removeEvent = (eventId) => {
    const updatedUserEvents = userEvents.filter((event) => event.id !== eventId);
    setUserEvents(updatedUserEvents);
  };

  return (
    <Container style={{ marginTop: '20px'}}>
      <Title>My Saved Events</Title>
      <div>
        <EventsContainer>
          {userEvents.map((item) => (
            <Event item={item} key={item.id} onRemove={removeEvent} />
          ))}
        </EventsContainer>
      </div>
    </Container>
  )
}

export default MyEvents