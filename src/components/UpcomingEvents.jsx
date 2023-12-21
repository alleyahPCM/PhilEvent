import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Event from './Event';
import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { fetchdata } from '../data';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
`
const FilterContainer = styled.div`
  display: flex;
`
const Filter = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #DA7422;
  margin-right: 5px;
`
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#DA7422' : 'white',
    '&:focus': {
      backgroundColor: state.isSelected ? '#DA7422' : '#f9f2db',
    },
    '&:hover': {
      backgroundColor: state.isSelected ? '#DA7422' : '#f9f2db', // Change the background color of the selected option
    },
  }),
  control: (provided) => ({
    ...provided,
    width: 140,
    backgroundColor: 'white', // Set default background color to white
    borderColor: 'gray',
    boxShadow: '0 0 0 0px #DA7422',
    '&:focus': {
      boxShadow: '0 0 0 2px #f9f2db', // Change border color on hover if needed
    },
    '&:hover': {
      borderColor: '#DA7422', // Change border color on hover if needed
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    width: 140,
    zIndex: 9999,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#888888',
  }),
};

const date = [
  { value: '', label: 'Select Date', isDisabled: true },
  { value: 'Today', label: 'Today' },
  { value: 'This Week', label: 'This Week' },
  { value: 'This Month', label: 'This Month' },
  { value: 'This Year', label: 'This Year' },
];

const EventsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; /* Align items to the left */
`

const ClearFilter = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: #DA7422;
  margin-top: 5px;
  &:hover, &:active {
    color: #D06023 !important;
  }
`;


const NoEventsText = styled.p`
  font-size: 18px;
  color: gray;
`

const UpcomingEvents = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cityOptions, setCityOptions] = useState([{ value: '', label: 'Select City', isDisabled: true }]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8080/uniquecities");
        const citiesFromDB = res.data.cities;
        const cityOptionsFromDB = citiesFromDB.map((city) => ({
          value: city,
          label: city,
        }));
        setCityOptions(prevOptions => [prevOptions[0], ...cityOptionsFromDB]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const handleDateChange = (selectedOption) => {
    const selectedDate = selectedOption.value;
    setSelectedDate(selectedDate);

    fetchEventsByCityAndDate(selectedDate).then((data) => {
      setEvents(data);
    });
  };

  const fetchEventsByCityAndDate = useCallback(async (selectedDate) => {
    try {
      let url = `http://localhost:8080/allevents?city=${selectedCity}`;

      if (selectedDate === 'Today') {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        url += `&startDate=${new Date().toISOString().split('T')[0]}&endDate=${new Date().toISOString().split('T')[0]}`;
        url += `&date=${formattedDate}`;
      } else if (selectedDate === 'This Week') {
        const today = new Date();
        const currentDay = today.getDay();

        const startOfWeek = new Date(today);
        startOfWeek.setDate((today.getDate() - currentDay) + 1);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - currentDay) + 1);

        const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
        const formattedAdjustedEndOfWeek = endOfWeek.toISOString().split('T')[0];

        url += `&startDate=${formattedStartOfWeek}&endDate=${formattedAdjustedEndOfWeek}`;
      } else if (selectedDate === 'This Month') {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0];
        const formattedEndOfMonth = endOfMonth.toISOString().split('T')[0];

        url += `&startDate=${formattedStartOfMonth}&endDate=${formattedEndOfMonth}`;
      } else if (selectedDate === 'This Year') {
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        const formattedStartOfYear = today.toISOString().split('T')[0];
        const formattedEndOfYear = endOfYear.toISOString().split('T')[0];

        url += `&startDate=${formattedStartOfYear}&endDate=${formattedEndOfYear}`;
      }

      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
    }
  }, [selectedCity]);

  const defaultDateOption = date[0];
  const defaultCityOption = cityOptions[0];

  const handleClearFilter = () => {
    setSelectedCity(defaultCityOption.value);
    setSelectedDate(defaultDateOption.value);
  };

  const [hasFetchedEvents, setHasFetchedEvents] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(loading);
      try {
        let data;
        if (selectedCity === '' && selectedDate === '') {
          data = await fetchdata();
        } else {
          data = await fetchEventsByCityAndDate(selectedDate);
        }
        setEvents(data);
        setHasFetchedEvents(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity, selectedDate, fetchEventsByCityAndDate, loading]);
  

  useEffect(() => {
    const scrollToEvents = () => {
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Check if the URL contains #events
    if (window.location.href.indexOf("#events") > -1) {
      // Scroll after a slight delay to ensure content is loaded
      setTimeout(scrollToEvents, 100);
    }
  }, []);

  return (
    <Container style={{ marginTop: 30, marginBottom: 50 }} id="events">
      <Title>Upcoming Events</Title>
      <hr />
      <FilterContainer>
        <Filter>
          <FilterText>Date: </FilterText>
          <Select
            options={date}
            styles={customStyles}
            value={date.find(option => option.value === selectedDate) || defaultDateOption}
            onChange={handleDateChange}
          />
        </Filter>
        <Filter>
          <FilterText>Location: </FilterText>
          <Select
            options={cityOptions}
            styles={customStyles}
            value={cityOptions.find(option => option.value === selectedCity) || cityOptions[0]}
            onChange={handleCityChange} // Handle city selection change
          />
        </Filter>
        <ClearFilter onClick={handleClearFilter}>Clear Filter</ClearFilter>
      </FilterContainer>
      <EventsContainer>
        {loading ? (
          <>
            <Skeleton width={950} height={50} />
          </>
        ) : hasFetchedEvents && events.length === 0 ? (
          <NoEventsText>No Events Found</NoEventsText>
        ) : (
          events.map((item) => <Event item={item} key={item.id} />)
        )}
      </EventsContainer>
    </Container>
  );
};

export default UpcomingEvents;
