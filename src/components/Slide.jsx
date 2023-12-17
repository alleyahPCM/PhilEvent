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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:480}}>
        <CarouselImage src={c2Image} alt="c12Image" text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:480}}>
        <CarouselImage src={c3Image} alt="c3Image" text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slide