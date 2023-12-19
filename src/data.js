import axios from "axios";

export const fetchdata = async () => {
  console.log("this is running");
  try {
    const res = await axios.get("http://localhost:8080/allevents");
    return res.data; // Assuming that the data you want is in the `data` property of the response.
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed.
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:8080/events/${eventId}`);
    return res.data; // Assuming that the data you want is in the response.
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed.
  }
};
