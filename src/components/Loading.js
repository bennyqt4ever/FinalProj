import React from "react";
import { MDBSpinner } from 'mdb-react-ui-kit';


const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
         <MDBSpinner role='status'>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
      </div>
    </div>
  );
};

export default Loading;
