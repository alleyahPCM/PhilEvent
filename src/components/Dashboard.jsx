import { useState, useEffect }from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import DashboardEvent from './DashboardEvent';
import axios from 'axios';


const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`

const Dashboard = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate((today.getDate() - currentDay) + 1);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - currentDay) + 1); // Adjusted to include events up to the end of Saturday

        const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
        const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

        const formattedStartDate = formattedStartOfWeek;
        const formattedEndDate = formattedEndOfWeek;

        const url = `http://localhost:8080/userweek?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

        const response = await axios.get(url);
        setUserEvents(response.data);
      } catch (error) {
        console.error('Error fetching user events:', error);
        // Handle errors, show message to the user, etc.
      }
    };

    fetchData();
  }, []);

  const getUserEventsByDay = (dayOfWeek) => {
    const events = userEvents.filter((event) => {
      const eventDate = new Date(event.date);
      const eventDayOfWeek = eventDate.getDay();
      return eventDayOfWeek === dayOfWeek;
    });

    return events.length > 0 ? events : [{ id: -1, date: 'Nothing Planned Yet' }]; // If no events, display "Nothing Planned Yet"
  };

  return (
    <Container style={{ marginTop: '20px'}}>
      <Title>Dashboard</Title>
      <div>
        <div style={{ margin: 20 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div key={day}>
              <h5>{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]}</h5>
              <hr />
              <div>
                {/* Display events for each day */}
                {getUserEventsByDay(day).map((item) => {
                  if (item.id === -1) {
                    return <p key={item.id} style={{ textAlign: 'center', margin: 'auto', color: '#888' }}>{item.date}</p>;
                  }
                  return <DashboardEvent item={item} key={item.id} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;