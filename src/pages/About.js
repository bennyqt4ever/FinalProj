import React from 'react';
import { Container, Row, Col, Image, Card} from 'react-bootstrap';
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill } from "react-icons/pi";
import Banner from "../components/Banner";
import Footers from "../components/Footers"

const cardStyle = {
  height: '280px', // Adjust the height as needed
  marginBottom: '30px',
  overflow: 'auto'
}


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};

const About = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <div>
        <Banner /> 

        <hr className='mb-5'/> 
           
        
        <Container className="mt-5">
            <div className="text-center">
              
              <h2 className="icon-color-3"> <span className='icon-color'>Here at</span> Intersect,</h2>
              <h3 className='icon-color'>You Can: </h3>
              <div className="divider is-centered"></div>
            </div>
          <div className='mb-6'>
          <Row className="mt-5 mb-5 text-center">
            <Col md={4}>
            <Card style={cardStyle} className='border-0'>
            <div style={containerStyle}>
            <PiNumberCircleOneFill
                        size={80}
                        className=" color-main mt-3"
                        alt="1"
                      />
            </div>
                <Card.Body>
                  <Card.Title className="icon-color-2">List a Skill</Card.Title>
                  <Card.Text>
                  Do you have expertise in a skill you're passionate about? Share your knowledge 
                  on Interlist! Create a post showcasing your skills, and in return, ask for assistance 
                  in the craft you're currently honing. It's a two-way street of learning and growth!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
            <Card style={cardStyle} className='border-0'>
            <div style={containerStyle}>
            <PiNumberCircleTwoFill
                        size={80}
                        className="color-main mt-3"
                        alt="2"
                      />
            </div>
                <Card.Body>
                  <Card.Title className="icon-color-2">Browse Skills</Card.Title>
                  <Card.Text>
                  Explore the diverse world of skills on Intersect! Navigate through 
                  the platform to discover the perfect match for your learning and 
                  growth journey. Here in our platform, you can find skills that 
                  align with your aspirations. 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
            <Card style={cardStyle} className='border-0'>
            <div style={containerStyle}>
            <PiNumberCircleThreeFill
                        size={80}
                        className="color-main mt-3"
                        alt="3"
                      />
            </div>
                <Card.Body>
                  <Card.Title className="icon-color-2">Collaborate</Card.Title>
                  <Card.Text>
                  Ready to dive into a skill listing? Go ahead and interact with
                  other users to begin the exchange! All you need to do is head 
                  over to the  chat feature and begin your discussions. Collaborate
                  and start learning now!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </div>

          <hr className='mb-5'/>
          
          <br/> 
                <br/>
          <Row className="mb-5">
            <Col className="text-center">
              <Image src="/images/intersect_graphics.png" alt="graphics" width={450} height={450} />
            </Col>
              <Col className="d-flex align-items-center">
                <div className="p-5 text-left text-dark">
                  <h1 className='icon-color-3'>Unlock learning without cost! </h1>
                    <p className='icon-color my-custom-text'>In today's tech-driven era, acquiring diverse skill sets is 
                    essential. However, economic constraints shouldn't hinder your learning journey. At our 
                    platform, exchange your time and effort to learn or solve problems, creating an accessible 
                    avenue for all students. </p>
                </div>
              </Col>
          </Row>
          <hr className='mb-5'/>    
          <Row className="mb-5">
            <Col className="d-flex align-items-center">
              <div className="p-4 text-left text-dark">
                <h1 className='icon-color-3'>Discover Your Tribe at Intersect!</h1>
                <p className='icon-color my-custom-text'>Learning is a transformative journey, and at Intersect, we believe it's better when shared. 
                  Join forces with like-minded individuals on a collective pursuit of becoming the best versions 
                  of yourselves.</p>
              </div>
            </Col>
            <Col className="text-center">
              <Image src="/images/new graphic.png" alt="BatStateU Logo" width={550} height={550} />
            </Col>
         </Row>   
      </Container>
      <br/>
      </div>
    </div>
    <Footers/>
   </div>
  );
};

export default About;