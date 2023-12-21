import axios from "axios";

export const fetchdata = async () => {
  console.log("this is running");
  try {
    const res = await axios.get("http://localhost:8080/allevents");
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:8080/events/${eventId}`);
    return res.data
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchEventBySearch = async (search) => {
  try {
    const res = await axios.get(`http://localhost:8080/searchevents/${search}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
