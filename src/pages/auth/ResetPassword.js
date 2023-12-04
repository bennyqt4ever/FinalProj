import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from "react-router-dom";
import { Container, Col} from 'react-bootstrap';
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password must match");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      await confirmPasswordReset(auth, searchParams.get("oobCode"), password);
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
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
                <h3 className="text-center mb-3 icon-color-3">Reset Password</h3>
                {success ? (
                  <p className="text-center mt-5">
                    Your password is successfully reset. You may login now.
                  </p>
                ) : (
                  <>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label icon-color-3">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label icon-color-3">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {error ? <p className="text-center text-danger">{error}</p> : null}
                    <div className="text-center mb-3">
                      <button className="btn btn-secondary btn-sm w-100">Reset</button>
                    </div>
                  </>
                )}
          </form>
      </Col>
    </Container>
  );
};

export default ResetPassword;
