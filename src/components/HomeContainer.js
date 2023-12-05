import React from "react";

const HomeContainer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ maxWidth: '45%', marginRight: '20px', borderRadius: '20px', overflow: 'hidden' }}>
        <img
          src="images/home-1.png"
          alt="First Description"
          style={{ width: '100%', height: '100%', borderRadius: '20px', paddingLeft: '10px' }}
        />
      </div>
      <div style={{ maxWidth: '45%', borderRadius: '20px', overflow: 'hidden' }}>
        <img
          src="images/home-2.png"
          alt="Second Description"
          style={{ width: '100%', height: '100%', borderRadius: '20px', paddingRight: '10px' }}
        />
      </div>
    </div>
  );
};

export default HomeContainer;