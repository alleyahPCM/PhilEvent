import { useRef, useEffect }from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
//import { sample } from '../data';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
  margin: 10px;
`

const Dashboard = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (content.scrollHeight <= content.clientHeight) {
      content.style.overflowY = 'hidden';
    } else {
      content.style.overflowY = 'scroll';
    }
  }, []);


  return (
    <Container>
      <Title>Dashboard</Title>
      <div ref={contentRef} style={{overflow: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 150px)'}}>
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
      </div>
  
    </Container>
  )
}

export default Dashboard