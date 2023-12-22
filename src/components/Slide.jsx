import Carousel from 'react-bootstrap/Carousel';
import c1Image from '../img/c1.jpg';
import c2Image from '../img/c2.png';
import c3Image from '../img/c3.png';
import styled from 'styled-components';

const CarouselImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    margin: 0 auto;
    filter: brightness(65%);
`


const Slide = () => {
  return (
    <Carousel>
      <Carousel.Item style={{height:480}}>
        <CarouselImage src={c1Image} alt="c1Image" text="First slide"/>
        <Carousel.Caption>
          <h3>Discover: PhilEvent - Your Gateway to Philippine Events</h3>
          <p>✨ Uncover events in the Philippines through PhilEvent's comprehensive event search. ✨</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:480}}>
        <CarouselImage src={c2Image} alt="c12Image" text="Second slide" />
        <Carousel.Caption>
          <h3>Seamless Event Management: Real-Time Saving, Dashboard, and Calendar Tracking</h3>
          <p>Save your favorite events effortlessly with PhilEvent's intuitive system. Never miss a moment! 📅💫</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:480}}>
        <CarouselImage src={c3Image} alt="c3Image" text="Third slide" />
        <Carousel.Caption>
          <h3>Embark on Adventure</h3>
          <p>Exploring the Philippines, one event at a time. Start your journey with PhilEvent today! 🌟 #PhilEventDiscovery</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slide