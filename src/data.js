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

export const sample = [
    {
        id: 1,
        img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg",
        title: "Dota TI",
        date: "August 14, 2023",
        time: "2 PM",
        address: "somewhere in Cebu",
        price: "Free",
        link: "#",
    },
    {
        id: 2,
        img: "https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg",
        title: "Twitch Con",
        date: "December 24, 2023",
        time: "3 AM",
        address: "somewhere in Manila",
        price: "Free",
        link: "#",
    },
]