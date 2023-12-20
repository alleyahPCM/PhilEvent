import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import NavBarAlt from '../components/NavBarAlt';
import Footer from '../components/Footer';
import axios from 'axios';
import styled from 'styled-components';
import Result from '../components/Result';

const MainContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

const ResultContainer = styled.div`
    flex-grow: 1;
`


const Search = () => {
  const [loggedinStatus, setLoggedinStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.valid) {
          setLoggedinStatus(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainContainer>
      {loggedinStatus ? <NavBarAlt /> : <NavBar />}
      <ResultContainer>
        <Result/>
      </ResultContainer>
      <Footer />
    </MainContainer>
  );
};

export default Search;
