import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h2`
  font-weight: bold;
  color: #A59132;
`

const Result = () => {
  return (
    <Container style={{marginTop: 30, marginBottom: 50}}>
        <Title>Results</Title>
        <hr/>
    </Container>
  )
}

export default Result