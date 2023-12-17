import axios from "axios";

export const fetchdata = async () => {
  try {
    const res = await axios.get("http://localhost:8080/allevents");
    console.log(res.data)
    return res.data; // Assuming that the data you want is in the `data` property of the response.
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed.
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:8080/events/${eventId}`);
    console.log(res.data);
    return res.data; // Assuming that the data you want is in the response.
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed.
  }
};

// Usage:
const popularEvents = await fetchdata();

export { popularEvents };
// export const popularEvents = [
//     {
//         id: 1,
//         img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg",
//         title: "Dota TI",
//         date: "August 14, 2023",
//         time: "2 PM",
//         city: "Cebu",
//         price: "Free",
//         link: "#",
//     },
//     {
//         id: 2,
//         img: "https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg",
//         title: "Twitch Con",
//         date: "December 24, 2023",
//         time: "3 AM",
//         city: "Manila",
//         price: "Free",
//         link: "#",
//     },
//     {
//         id: 3,
//         img: "https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/CSGO/2022/2022-PGL-Major-Antwerp-articles/Plain-background-PGL-Logo-Pinnacle-In-case-we-need-to-do-ad-hoc-stuff-Article.jpg",
//         title: "CS Majors",
//         date: "November 5, 2023",
//         time: "5 PM",
//         city: "Davao",
//         price: "Free",
//         link: "#",
//     },
//     {
//         id: 4,
//         img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg",
//         title: "Dota TI",
//         date: "August 14, 2023",
//         time: "2 PM",
//         city: "Cebu",
//         price: "Free",
//         link: "#",
//     }
// ]

export const sample = [
    {
        id: 1,
        img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dpc/social_ti10.jpg",
        title: "Dota TI",
        date: "August 14, 2023",
        time: "2 PM",
        location: "Cebu",
        price: "Free",
        link: "#",
    },
    {
        id: 2,
        img: "https://cdn.neowin.com/news/images/uploaded/2023/07/1688839676_banner-twitchcon-2023.jpg",
        title: "Twitch Con",
        date: "December 24, 2023",
        time: "3 AM",
        location: "Manila",
        price: "Free",
        link: "#",
    },
]