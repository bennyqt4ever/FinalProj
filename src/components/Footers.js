import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';

  import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <MDBFooter className='bg-light text-center text-dark pt-4 mt-5'>
      <Link>
          <img 
          src= "./images/Nav-icon-text.png"
          alt = "icon-text"
          width= "auto"
          height="40px"
          className="d-inline-block alaign-center"
          />
        </Link>

      <h5 className='pt-4 pb-0 icon-color-3'>Contact Us</h5>
      <MDBContainer>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3 icon-color-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Intersect: Where Skills Meet and Exchange
      </div>
    </MDBFooter>
  );
}

export default Footers