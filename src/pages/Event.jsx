import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import NavBarAlt from '../components/NavBarAlt';
import EventTemplate from '../components/EventTemplate';
import axios from 'axios';

const Event = () => {
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
        <EventTemplate/>
    </div>
  )
}

export default Event