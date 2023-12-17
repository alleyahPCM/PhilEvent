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
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray',
  }),
};

const date = [
  { value: '', label: 'Select Date', isDisabled: true },
  { value: 'Today', label: 'Today' },
  { value: 'This Week', label: 'This Week' },
  { value: 'This Month', label: 'This Month' },
  { value: 'This Year', label: 'This Year' },
];

const city = [
  { value: '', label: 'Select City', isDisabled: true },
  { value: 'Cebu', label: 'Cebu' },
  { value: 'Manila', label: 'Manila' },
  { value: 'Davao', label: 'Davao' },
];

const EventsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; /* Align items to the left */
`

const PopularEvents = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]); // State to hold events

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
        const startOfWeek = new Date(today); // Copy current date
        startOfWeek.setDate(today.getDate() - currentDay); // Go back to the start of the current week (Sunday)
      
        const endOfWeek = new Date(today); // Copy current date
        endOfWeek.setDate(today.getDate() + (6 - currentDay)); // Move to the end of the current week (Saturday)
      
        const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
        const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];
      
        url += `&startDate=${formattedStartOfWeek}&endDate=${formattedEndOfWeek}`;
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

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (selectedCity === '' && selectedDate === '') {
        data = await fetchdata();
      } else {
        data = await fetchEventsByCityAndDate(selectedDate);
      }
      setEvents(data);
    };
    fetchData();
  }, [selectedCity, selectedDate, fetchEventsByCityAndDate]);

  return (
    <Container style={{ marginTop: 30, marginBottom: 50}}>
    <Title>Popular Events</Title>
    <hr/>
    <FilterContainer>
      <Filter>
        <FilterText>Date: </FilterText>
        <Select
          options={date}
          styles={customStyles}
          defaultValue={date[0]}
          onChange={handleDateChange}
        />
      </Filter>
      <Filter>
        <FilterText>Location: </FilterText>
        <Select
          options={city}
          styles={customStyles}
          defaultValue={city[0]}
          onChange={handleCityChange} // Handle city selection change
        />
      </Filter>
    </FilterContainer>
    <EventsContainer>
      {events.map((item) => (
          <Event item={item} key={item.id} />
      ))}
    </EventsContainer>
  </Container>
  );
};

export default PopularEvents;
