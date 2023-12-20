import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import NavBarAlt from '../components/NavBarAlt';
import Slide from '../components/Slide';
import Footer from '../components/Footer';
import axios from 'axios';
import UpcomingEvents from '../components/UpcomingEvents';

const Home = () => {
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
    <div>
      {loggedinStatus ? (
        <NavBarAlt />
      ) : (
        <NavBar />
      )}
      <Slide />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default Home