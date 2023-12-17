import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Select from 'react-select';
import { popularEvents } from '../data';
import Event from './Event';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  { value: 'Today', label: 'Today' },
  { value: 'This Week', label: 'This Week' },
  { value: 'This Month', label: 'This Month' },
  { value: 'This Year', label: 'This Year' },
];

const location = [
  { value: 'Cebu', label: 'Cebu' },
  { value: 'Manila', label: 'Manila' },
  { value: 'Davao', label: 'Davao' },
];

const EventsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust margin as needed */
`;

const PopularEvents = () => {
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
        />
      </Filter>
      <Filter>
        <FilterText>Location: </FilterText>
        <Select
          options={location}
          styles={customStyles}
          defaultValue={location[0]}
        />
      </Filter>
    </FilterContainer>
    <EventsContainer>
      {popularEvents.map((item) => (
        <Event item={item} key={item.id}/>
      ))}
    </EventsContainer>
    <Stack spacing={2}>
      <PaginationContainer>
        <Pagination count={10} />
      </PaginationContainer>
    </Stack>
  </Container>
  );
};

export default PopularEvents;
