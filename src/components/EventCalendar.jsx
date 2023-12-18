import { useState, useRef, useEffect }from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Meeting 1',
    start: new Date(2023, 11, 1),
    end: new Date(2023, 11, 2),
    description: 'Details about Meeting 1',
  },
  {
    title: 'Meeting 2',
    start: new Date(2023, 11, 15),
    end: new Date(2023, 11, 17),
    description: 'Details about Meeting 2',
  },
  // Add more events as needed
];

const EventCalendar = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (content.scrollHeight <= content.clientHeight) {
      content.style.overflowY = 'hidden';
    } else {
      content.style.overflowY = 'scroll';
    }
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Container>
        <Title>Calendar</Title>
        <div ref={contentRef} style={{overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)'}}>
          <div style={{ height: '800px', padding: '20px' }}>
            <Calendar
              localizer={localizer}
              events={events}
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
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    </Container>
  )
}

export default EventCalendar