import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import { Link } from "react-router-dom";
import TrackVisibility from 'react-on-screen';

const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const toRotate = useMemo(() => ["Intersect!"], []);

  const period = 2000;

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [loopNum, isDeleting, text, toRotate, setDelta, setIsDeleting, setText]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta, tick]);

  return (
    <section className="banner" style={{ marginTop: '0px' }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={`animate__animated ${isVisible ? "animate__fadeIn" : ""}`}>
                  <h1>{`Hi! Welcome to`} <br /> <span className="txt-rotate" data-period="1000" data-rotate='[ "Intersect!" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Where Skills Meet and Exchange. A virtual hub for navigating the ever-evolving knowledge landscape, Intersect is more than a platform; it's your guide beyond classroom boundaries. Join us in making skill acquisition easy and collaborative.</p>
                  <Link to="/auth/register" className="custom-link">
                    <button onClick={() => console.log('connect')}>Let’s Get Started <ArrowRightCircle size={25} /></button>
                  </Link>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={`animate__animated ${isVisible ? "animate__zoomIn" : ""}`}>
                  <img id="paul" src="./images/about-icon (1).png" alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Banner;
