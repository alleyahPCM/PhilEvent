import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { BiCalendarPlus } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';

function Events(props) {
    return (
        <Card style={{ width: '22rem', margin: '1em 1.5em'}}>
            <img src={props.img} id='cardImg' />
            <div className='cardSection'>
                <div className='cardBtn'><BiCalendarPlus style={{ fontSize: '1.5em' }} /></div>
                <div className='cardBtn'><AiFillHeart style={{ fontSize: '1.5em' }} /></div>
            </div>
            <Card.Body>
                <Card.Title id='cardTitle'>{props.name}</Card.Title>
                <Card.Text id='cardContent'>
                    {props.date} <br />
                    <span>{props.loc}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Events;