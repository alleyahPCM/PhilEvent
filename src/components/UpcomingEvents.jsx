import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Select from 'react-select';
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
  const [events, setEvents] = useState([]); // State to hold events

  const [cityOptions, setCityOptions] = useState([{ value: '', label: 'Select City', isDisabled: true }]);

  useEffect(() => {
    // Fetch unique cities from the backend when the component mounts
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8080/uniquecities"); // Replace with your actual endpoint
        const citiesFromDB = res.data.cities; // Assuming cities are returned as an array from the API
        const cityOptionsFromDB = citiesFromDB.map((city) => ({
          value: city,
          label: city,
        }));
        setCityOptions(prevOptions => [prevOptions[0], ...cityOptionsFromDB]); // Merge with the default value
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
        const currentDay = today.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate((today.getDate() - currentDay) + 1); // Go back to the start of the current week (Sunday)
        
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - currentDay) + 1); // Move to the end of the current week (Saturday)
        
        const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
        const formattedAdjustedEndOfWeek = endOfWeek.toISOString().split('T')[0];
        
        // Use the adjusted end date for filtering events up to the end of Saturday
        url += `&startDate=${formattedStartOfWeek}&endDate=${formattedAdjustedEndOfWeek}`;      
      } else if (selectedDate === 'This Month') {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of current month
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of current month
      
        const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0];
        const formattedEndOfMonth = endOfMonth.toISOString().split('T')[0];
      
        url += `&startDate=${formattedStartOfMonth}&endDate=${formattedEndOfMonth}`;
      } else if (selectedDate === 'This Year') {
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31); // End of the current year
      
        const formattedStartOfYear = today.toISOString().split('T')[0];
        const formattedEndOfYear = endOfYear.toISOString().split('T')[0];
      
        url += `&startDate=${formattedStartOfYear}&endDate=${formattedEndOfYear}`;
      }

      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
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
      let data;
      if (selectedCity === '' && selectedDate === '') {
        data = await fetchdata();
      } else {
        data = await fetchEventsByCityAndDate(selectedDate);
      }
      setEvents(data);
      setHasFetchedEvents(true);
    };
    fetchData();
  }, [selectedCity, selectedDate, fetchEventsByCityAndDate]);

  

  return (
    <Container style={{ marginTop: 30, marginBottom: 50}} id="events">
    <Title>Upcoming Events</Title>
    <hr/>
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
      {hasFetchedEvents && events.length === 0 ? (
        <NoEventsText>No Events Found</NoEventsText>
      ) : (
        events.map((item) => (
          <Event item={item} key={item.id} />
        ))
      )}
    </EventsContainer>
  </Container>
  );
};

export default UpcomingEvents;
