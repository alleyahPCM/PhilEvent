import { useRef, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { popularEvents } from '../data';
import Event from './Event';

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
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (content.scrollHeight <= content.clientHeight) {
      content.style.overflowY = 'hidden';
    } else {
      content.style.overflowY = 'scroll';
    }
  }, []);

  return (
    <Container>
        <Title>My Events</Title>
        <div ref={contentRef} style={{overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)'}}>
          <EventsContainer>
            {popularEvents.map((item) => (
              <Event item={item} key={item.id}/>
            ))}
          </EventsContainer>
        </div>
    </Container>
  )
}

export default MyEvents