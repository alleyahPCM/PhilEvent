import { useState, useEffect }from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`

const CloseButton = styled(Button)`
  width: 70px;
  border-radius: 45px;
  background-color: #ced4da;
  color: gray;
  border: none;

  &:hover {
    background-color: #c3c9ce;
    color: gray;
  }

  &:active, &:focus {
    background-color: #c3c9ce !important;
    color: gray !important;
  }
`

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/usercalendar")
      .then(res => {
        setUserEvents(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Container style={{ marginTop: '20px'}}>
        <Title>Calendar</Title>
        <div>
          <div style={{ height: '800px', padding: '20px' }}>
            <Calendar
              localizer={localizer}
            events={userEvents}
              startAccessor="start"
              endAccessor="end"
              views={['month']}
              defaultDate={new Date(2023, 11, 1)}
              style={{ maxHeight: '100%', width: '100%' }}
              components={{
                month: {
                  event: ({ event }) => (
                    <div>
                      <strong>{event.title}</strong>
                    </div>
                  ),
                },
              }}
              onSelectEvent={handleSelectEvent}
            />

            <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedEvent?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{selectedEvent?.description}</p>
                {/* Display other event details as needed */}
              </Modal.Body>
              <Modal.Footer>
                <CloseButton onClick={handleCloseModal}>
                  Close
                </CloseButton>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    </Container>
  )
}

export default EventCalendar