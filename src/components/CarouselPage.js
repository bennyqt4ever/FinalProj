import React from 'react'
import Carousel from 'react-bootstrap/Carousel';



const CarouselPage = () => {
  return (
    <div>
    <Carousel className="carousel-transition">
    <Carousel.Item>
      <img style={{height:'50vh',objectFit: 'cover'}}
        className="d-block w-100"
        src="./images/1.png"
        alt="First slide"
        
      />
  
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'50vh', objectFit: 'cover'}}
        className="d-block w-100"
        src="./images/2.png"
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'50vh', objectFit: 'cover'}}
        className="d-block w-100"
        src="./images/3.png"
        alt="third slide"
    />
    </Carousel.Item>
  </Carousel>
  </div>
  )
}

export default CarouselPage