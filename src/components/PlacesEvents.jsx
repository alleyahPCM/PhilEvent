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
  justify-content: center;
`

const MoreLink = styled.a`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
    cursor: pointer;
  }
`

const PlacesEvents = () => {
  const [events, setEvents] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [showMore, setShowMore] = useState({});

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

    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8080/uniquecities");
        const citiesFromDB = res.data.cities;
        const cityOptionsFromDB = citiesFromDB.map((city) => ({
          value: city,
          label: city,
        }));
        setCityOptions(cityOptionsFromDB);
        // Initializing showMore state for each city as false initially
        const showMoreInitialState = {};
        cityOptionsFromDB.forEach((city) => {
          showMoreInitialState[city.value] = false;
        });
        setShowMore(showMoreInitialState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  const getEventsByCity = (city) => {
    return events.filter((event) => event.city === city);
  };

  const toggleShowMore = (city) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [city]: !prevShowMore[city],
    }));
  };

  return (
    <Container style={{ marginTop: 30, marginBottom: 50 }}>
      {cityOptions.map(({ value: city }, index) => (
        <div key={index}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Title>{city}</Title>
            <MoreLink onClick={() => toggleShowMore(city)}>
              <span>{showMore[city] ? 'View Less...' : 'View More...'}</span>
            </MoreLink>
          </div>
          <hr />
          <EventsContainer>
            {getEventsByCity(city).map((item, i) => (
              <div key={i} style={{ display: showMore[city] ? 'block' : i < 8 ? 'block' : 'none' }}>
                <Event item={item} />
              </div>
            ))}
          </EventsContainer>
        </div>
      ))}
    </Container>
  )
}

export default PlacesEvents;
