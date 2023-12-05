import React, { useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
} from 'react-icons/pi';
import Banner from '../components/Banner';
import Footers from '../components/Footers';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const cardStyle = (index) => ({
    height: '280px',
    marginBottom: '30px',
    overflow: 'auto',
    transition: 'transform 0.3s ease-in-out',
    transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
    boxShadow: hoveredCard === index ? '0 0 20px rgba(0, 0, 0, 0.1)' : 'none',
    cursor: 'pointer',
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div>
          <Banner />

          <hr className="mb-5" />

          <Container className="mt-5">
            <div className="text-center">
              <h2 className="icon-color-3">
                {' '}
                <span className="icon-color">Here at</span> Intersect,
              </h2>
              <h3 className="icon-color">You Can: </h3>
              <div className="divider is-centered"></div>
            </div>
            <div className="mb-6">
              <Row className="mt-5 mb-5 text-center">
                {[0, 1, 2].map((index) => (
                  <Col xs={12} md={4} key={index}>
                    <Card
                      style={cardStyle(index)}
                      className="border-0"
                      onMouseOver={() => handleCardHover(index)}
                      onMouseOut={handleCardLeave}
                    >
                      <div style={containerStyle}>
                        {index === 0 && (
                          <PiNumberCircleOneFill
                            size={80}
                            className=" color-main mt-3"
                            alt="1"
                          />
                        )}
                        {index === 1 && (
                          <PiNumberCircleTwoFill
                            size={80}
                            className="color-main mt-3"
                            alt="2"
                          />
                        )}
                        {index === 2 && (
                          <PiNumberCircleThreeFill
                            size={80}
                            className="color-main mt-3"
                            alt="3"
                          />
                        )}
                      </div>
                      <Card.Body>
                        <Card.Title className="icon-color-2">
                          {index === 0 && 'List a Skill'}
                          {index === 1 && 'Browse Skills'}
                          {index === 2 && 'Collaborate'}
                        </Card.Title>
                        <Card.Text>
                          {index === 0 && (
                            <>
                              Do you have expertise in a skill you're passionate
                              about? Share your knowledge on Interlist! Create a
                              post showcasing your skills, and in return, ask for
                              assistance in the craft you're currently honing. It's
                              a two-way street of learning and growth!
                            </>
                          )}
                          {index === 1 && (
                            <>
                              Explore the diverse world of skills on Intersect!
                              Navigate through the platform to discover the perfect
                              match for your learning and growth journey. Here in our
                              platform, you can find skills that align with your
                              aspirations.
                            </>
                          )}
                          {index === 2 && (
                            <>
                              Ready to dive into a skill listing? Go ahead and
                              interact with other users to begin the exchange! All
                              you need to do is head over to the chat feature and
                              begin your discussions. Collaborate and start learning
                              now!
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <hr className="mb-5" />

            <br />
            <br />
            <Row className="mb-5">
              <Col xs={12} md={6} className="text-center">
                <Image
                  src="/images/about-1.png"
                  alt="graphics"
                  width={300}
                  height={300}
                  className="mb-3 mx-auto d-block"
                />
              </Col>
              <Col xs={12} md={6} className="d-flex align-items-center">
                <div className="p-5 text-left text-dark text-center text-lg-left">
                  <h1 className="icon-color-3">Unlock learning without cost! </h1>
                  <p className="icon-color my-custom-text">
                    In today's tech-driven era, acquiring diverse skill sets is
                    essential. However, economic constraints shouldn't hinder
                    your learning journey. At our platform, exchange your time
                    and effort to learn or solve problems, creating an
                    accessible avenue for all students.
                  </p>
                </div>
              </Col>
            </Row>
            <hr className="mb-5" />
            <Row className="mb-5">
              <Col xs={12} md={6} className="d-flex align-items-center">
                <div className="p-4 text-left text-dark text-center text-lg-left">
                  <h1 className="icon-color-3">
                    Discover Your Tribe at Intersect!
                  </h1>
                  <p className="icon-color my-custom-text">
                    Learning is a transformative journey, and at Intersect, we
                    believe it's better when shared. Join forces with
                    like-minded individuals on a collective pursuit of becoming
                    the best versions of yourselves.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="text-center">
                <Image
                  src="/images/about-2.png"
                  alt="graphic2"
                  width={330}
                  height={330}
                  className="mb-3 mx-auto d-block"
                />
              </Col>
            </Row>
          </Container>
          <br />
        </div>
        <Footers />
      </div>
    </div>
  );
};

export default About;
