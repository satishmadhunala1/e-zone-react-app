import React from "react";
import Carousel from 'react-bootstrap/Carousel';

const Carosel = () => {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="/assests/Carosal/phoneslide.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="/assests/Carosal/budsslide.jpg"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="/assests/Carosal/furnitureslide.jpg"
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  );
};

export default Carosel;
