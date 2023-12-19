import { Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const EventLink = styled(Link)`
  text-decoration: none;
  color: #DA7422;

  &:hover {
    color: #D06023;
  }
`

const CardTitle = styled(Card.Title)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  /* Ensure the ellipsis shows up properly */
  -webkit-box-decoration-break: clone;
  /* Optional: Adjust the line height for better appearance */
  line-height: 1.4;
  font-weight: bold;
`;

const DashboardEvent = ({item}) => {
  return (
    <Card style={{ width: '100%', marginBottom: '10px' }}>
      <Row className="g-0">
        <Col md={2}>
          <Card.Img
            variant="top"
            src={item.img}
            alt="Card image"
            style={{ objectFit: 'cover', maxHeight: '100px', width: '100%' }}
          />
        </Col>
        <Col md={10}>
          <Card.Body>
            <EventLink to={`/Event/${item.id}`}>
                  <CardTitle>{item.title}</CardTitle>
            </EventLink>
            <Card.Text>
                <span>{item.address}</span><span> | </span>
                <span>{item.time}</span>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardEvent;
