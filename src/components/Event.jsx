import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';

import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';

const EventContainer = styled.div`
  margin: 10px;
`;

const EventCard = styled(Card)`
  width: 18rem;
  max-width: 100%; /* Ensures the card doesn't exceed its container */
  height: 310px;
`;

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
  color: black;

  &:hover, &:focus {
    background-color: #DA7422;
    color: white !important;
  }

  &:active {
    background-color: #D06023  !important;
    color: white !important;
  }
}
`

const StyledBiCalendarPlus = styled(BiCalendarPlus)`
  font-size: 24px;
`;

const StyledAiFillHeart = styled(AiFillHeart)`
  font-size: 24px;
`;

const CardSection = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: auto;
  z-index: 1;
  margin-top: -25px;
  margin-bottom: -20px;
`
const EventLink = styled(Link)`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
  }
`

const CardTitle = styled(Card.Title)`
  font-size: 20px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Set maximum number of lines to 2 */
  -webkit-line-clamp: 2;
  /* Ensure the ellipsis shows up properly */
  -webkit-box-decoration-break: clone;
  /* Optional: Adjust the line height for better appearance */
  line-height: 1.4;
`;

const Event = ({item}) => {
  const titleRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setIsOverflowing(titleRef.current.scrollHeight > titleRef.current.clientHeight);
    }
  }, [item.title]);



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
                <EventLink to={`/Event/${item.id}`}>
                <CardTitle ref={titleRef}>{item.title}</CardTitle>
              </EventLink>
                <Card.Text id='cardContent' style={{fontSize: 16}}>
                    <span>{item.date}</span><span> | </span>
                    <span>{item.time}</span> <br/>
                    <span>{item.city}</span> <br/>
                    <span style={{color: '#DA7422'}}>{item.price}</span>
                </Card.Text>
            </Card.Body>
        </EventCard>
    </EventContainer>
  )
}

export default Event