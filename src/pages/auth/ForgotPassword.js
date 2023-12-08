import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, Col} from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setEmail("");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container fluid className='p-5 d-flex align-items-center justify-content-center'> 
      <Col md='5' className='position-relative'>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <form className="shadow rounded p-3 mt-5 form bg-glass" onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <img
                src="../images/logo.png"
                alt="logo"
                width="auto"
                height="50px"
                className="mx-auto d-block"
              />
            </div>
              <h3 className="text-center mb-3 icon-color-3">Forgot Password</h3>
              {success ? (
                <p className="text-center mt-5 icon-color-3">
                  An e-mail is sent containing password reset instructions
                </p>
              ) : (
                <>
                  <div className="mb-3">
                    <label htmlFor="email"  style={{ borderRadius: '10px' }} className="form-label icon-color-3">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error ? <p className="text-center text-danger">{error}</p> : null}
                  <div className="text-center mb-3">
                    <button style={{ borderRadius: '25px' }} className="btn btn-secondary btn-sm w-50">Send</button>
                  </div>
                </>
              )}
          </form>
      </Col>
    </Container>
  );
};

export default ForgotPassword;
