import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselPage = () => {
  return (
    <div className="container-fluid carousel-container">
      <div className="row">
        <div className="col-12">
          <Carousel className="carousel-transition">
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="./images/carousel1.png"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="./images/carousel2.png"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src="./images/carousel3.png"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
