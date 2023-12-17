import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';

import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';


const EventContainer = styled.div`
  margin: 10px;
`
const EventCard = styled(Card)`
  width: 18rem;
`
const EventImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`
const CardButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon */
  padding: 10px; /* Add padding for the icon */
  border-radius: 50%;
  margin-right: 5px;
  background-color: white;
  border: none;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);

  &:hover, &:focus {
    background-color: #DA7422;
  }

  &:active {
    background-color: #D06023  !important;
  }
}
`

const StyledBiCalendarPlus = styled(BiCalendarPlus)`
  font-size: 24px;
  color: black;

  ${CardButton}:hover & {
    color: white;
  }

  ${CardButton}:focus & {
    color: white;
  }

  ${CardButton}:active & {
    color: white;
  }
`;

const StyledAiFillHeart = styled(AiFillHeart)`
  font-size: 24px;
  color: black;

  ${CardButton}:hover & {
    color: white;
  }

  ${CardButton}:focus & {
    color: white;
  }

  ${CardButton}:active & {
    color: white;
  }
`;

const CardSection = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: auto;
  z-index: 1;
  margin-top: -25px;
  margin-bottom: -20px;
`
const EventLink = styled.a`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
  }
`

const Event = ({item}) => {
  return (
    <EventContainer>
      <EventCard>
            <EventImg src={item.img} id='cardImg' alt='Event' />
            <CardSection>
              <CardButton>
                <StyledBiCalendarPlus />
              </CardButton>
              <CardButton>
                <StyledAiFillHeart />
              </CardButton>
            </CardSection>
            <Card.Body>
                <EventLink href={item.link}>
                  <Card.Title style={{fontSize: 24, fontWeight: 'bold'}}>{item.title}</Card.Title>
                </EventLink>
                <Card.Text id='cardContent' style={{fontSize: 16}}>
                    <span>{item.date}</span><span> | </span>
                    <span>{item.time}</span> <br/>
                    <span>{item.location}</span> <br/>
                    <span style={{color: '#DA7422'}}>{item.price}</span>
                </Card.Text>
            </Card.Body>
        </EventCard>
    </EventContainer>
  )
}

export default Event