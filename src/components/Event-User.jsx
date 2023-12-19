import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Toast, Modal } from 'react-bootstrap';
import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventContainer = styled.div`
  margin: 10px;
`;

const EventCard = styled(Card)`
  width: 18rem;
  height: 315px;
`;

const EventImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

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

const EventLink = styled(Link)`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
  }
`;

const Event = ({ item, onRemove }) => {
  const titleRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setIsOverflowing(titleRef.current.scrollHeight > titleRef.current.clientHeight);
    }
  }, [item.title]);

  const toast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const confirmModal = async () => {
    try {
      console.log(item.id)
      const response = await axios.delete("http://localhost:8080/removeevent/"+item.id)
      setStatus(response.data.success)
      setMessage(response.data.message)
      toast()
      if (response.data.success) {
        onRemove(item.id);
      }
    } catch (error) {
      console.error("Remove failed:", error.response.data.error);
    }

    setShowConfirmationModal(false);
  };

  return (
    <EventContainer>
      <EventCard>
        <EventImg src={item.img} id='cardImg' alt='Event' />
        <Card.Body>
          <EventLink to={`/Event/${item.id}`}>
            <CardTitle ref={titleRef}>{item.title}</CardTitle>
          </EventLink>
          <Card.Text id='cardContent' style={{ fontSize: 16 }}>
            <span>{item.date}</span><span> | </span>
            <span>{item.time}</span> <br />
            <span>{item.city}</span> <br />
            <a onClick={() => setShowConfirmationModal(true)} style={{ textAlign: "right", display: "block", color: "red", cursor: "pointer" }}>Remove</a>
          </Card.Text>
        </Card.Body>
      </EventCard>

      {/* Floating Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg={status ? "success" : "danger"}
        style={{
          position: 'fixed',
          top: '15px',
          right: '13px',
          width: '200px', // Set the width as needed
          zIndex: 1,
        }}
      >
        <Toast.Body style={{ color: 'white' }}>{message}</Toast.Body>
      </Toast>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this event? <br/>
          <Card.Title style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Card.Title> on <span>{item.date}</span><span> | </span>
          <span>{item.time}</span> - <span>{item.city}</span> <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </EventContainer>
  );
};

export default Event;