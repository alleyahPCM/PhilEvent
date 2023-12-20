import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchdata } from '../data';
import Event from './Event';
import axios from "axios";

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
  const [cityOptions, setCityOptions] = useState([]);

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

    // Fetch unique cities from the backend when the component mounts
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8080/uniquecities"); // Replace with your actual endpoint
        const citiesFromDB = res.data.cities; // Assuming cities are returned as an array from the API
        const cityOptionsFromDB = citiesFromDB.map((city) => ({
          value: city,
          label: city,
        }));
        setCityOptions(cityOptionsFromDB); // Set city options directly from the database
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  // Function to filter events by city
  const getEventsByCity = (city) => {
      return events.filter((event) => event.city === city).slice(0, 8);
  };

  return (
      <Container style={{marginTop: 30, marginBottom: 50}}>
          {cityOptions.map(({ value: city }, index) => (
              <div key={index}>
                  <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                      <Title>{city}</Title>
                      <MoreLink href={`#${city}`}><span>View More...</span></MoreLink>
                  </div>
                  <hr/>
                  <EventsContainer id={city}>
                      {getEventsByCity(city).map((item) => (
                          <Event item={item} key={item.id} />
                      ))}
                  </EventsContainer>
              </div>
          ))}
      </Container>
  )
}

export default PlacesEvents;