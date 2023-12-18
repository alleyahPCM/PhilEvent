import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import NavBarAlt from '../components/NavBarAlt';
import Footer from '../components/Footer';
import axios from 'axios';
import PlacesEvents from '../components/PlacesEvents';

const Places = () => {
    const [loggedinStatus, setLoggedinStatus] = useState(false);
    useEffect(() => {
      axios
        .get("http://localhost:8080/")
        .then((res) => {
          console.log(res);
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
        <PlacesEvents/>
        <Footer />
      </div>
    );
}

export default Places