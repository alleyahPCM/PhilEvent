import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import c1 from "../img/c1.jpg";
import c2 from "../img/c2.png";
import c3 from "../img/c3.jpg";
import what from "../img/what_text.png";

function WebBanner() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100" id="carImg" src={c1} alt="Second slide" />
                <Carousel.Caption>
                    <img src={what} alt="What is PhilEvent?" className=""/>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" id="carImg" src={c2} alt="Second slide" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" id="carImg" src={c3} alt="Second slide" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default WebBanner;