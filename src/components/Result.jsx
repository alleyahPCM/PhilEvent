import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';
import { fetchEventBySearch } from '../data';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Search } from '@mui/icons-material';
import 'react-loading-skeleton/dist/skeleton.css';
import Event from './Event';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';

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

const ClearFilter = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: #DA7422;
  margin-top: 5px;
  &:hover, &:active {
    color: #D06023 !important;
  }
`;

const EventsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; /* Align items to the left */
`

const NoEventsText = styled.p`
  font-size: 18px;
  color: gray;
`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  margin-right: 10px;
`

const SearchBar = styled(Form.Control)`
    padding: 6px 0px 6px 12px;
    background-color: transparent;

    &:focus {
        background-color: transparent;
        outline: none !important;
        box-shadow: none;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
    }
`

const SearchIcon = styled(Search)`
  margin-right: 5px;
  color: gray;
  fontSize: 18px;
`;

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

const Result = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [cityOptions, setCityOptions] = useState([{ value: '', label: 'Select City', isDisabled: true }]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetchedEvents, setHasFetchedEvents] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const defaultDateOption = date[0];
  const defaultCityOption = cityOptions[0];
  const search = new URLSearchParams(useLocation().search).get('search');

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

  const fetchEventsByCityAndDate = useCallback(async (selectedDate) => {
    try {
      let url = `http://localhost:8080/searchevents/${search}/?city=${selectedCity}`;

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
  }, [selectedCity, search]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(loading)
      try {
        let data;
        if (selectedCity === '' && selectedDate === '') {
          data = await fetchEventBySearch(search);
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
  }, [selectedCity, selectedDate, fetchEventsByCityAndDate, search, loading]);

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

  const handleClearFilter = () => {
    setSelectedCity(defaultCityOption.value);
    setSelectedDate(defaultDateOption.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue !== '') {
      window.location.href = `/Search?search=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <Container style={{ marginTop: 30, marginBottom: 50 }}>
      <Title>Results</Title>
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

        <Form className="d-flex ms-auto" onSubmit={handleSubmit}>
          <SearchContainer>
            <SearchBar
              type="search"
              name="searsh"
              defaultValue={search}
              placeholder="Search"
              className="border-0"
              aria-label="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button type="submit" variant="link"><SearchIcon /></Button>
          </SearchContainer>
        </Form>
      </FilterContainer>
      <EventsContainer>
        {loading ? (
          <>
            <SkeletonTheme>
              <Skeleton width={950} height={50} />
            </SkeletonTheme>
          </>
        ) : hasFetchedEvents && events.length === 0 ? (
          <NoEventsText>No Events Found</NoEventsText>
        ) : (
          events.map((item) => <Event item={item} key={item.id} />)
        )}
      </EventsContainer>
    </Container>
  )
}

export default Result