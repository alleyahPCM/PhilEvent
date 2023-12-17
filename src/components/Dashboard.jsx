import { useRef, useEffect, useState }from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { popularEvents } from '../data';
import Event from './Event';
import DashboardEvent from './DashboardEvent';
//import { sample } from '../data';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`

const Dashboard = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [shouldScroll, setShouldScroll] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (content.scrollHeight > content.clientHeight) {
      setShouldScroll(true);
    } else {
      setShouldScroll(false);
    }
  }, [shouldScroll]); // Re-run the effect whenever shouldScroll state changes


  return (
    <Container>
      <Title>Dashboard</Title>
      <div ref={contentRef} style={{overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)'}}>
        <div>
          <div style={{margin: 20}}>
            <h5>Sunday</h5>
            <hr/>
            <div>
              {/* {sample.map((item) => (
                <DashboardEvent item={item} key={item.id}/>
              ))} */}
            </div>
            <h5>Monday</h5>
            <hr/>
            <div>

            </div>
            <h5>Tuesday</h5>
            <hr/>
            <div>

            </div>
            <h5>Wednesday</h5>
            <hr/>
            <div>

            </div>
            <h5>Thursday</h5>
            <hr/>
            <div>

            </div>
            <h5>Friday</h5>
            <hr/>
            <div>

            </div>
            <h5>Saturday</h5>
            <hr/>
            <div>

            </div>
          </div>
          <Title>Recommended Events</Title>
          <div style={{margin: 20}}>
            <Carousel responsive={responsive}>
              {popularEvents.map((item) => (
                  <Event item={item} key={item.id}/>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
  
    </Container>
  )
}

export default Dashboard