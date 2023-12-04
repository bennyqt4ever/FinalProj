import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Button, InputGroup, Container, Col, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const handleFirebaseError = (errorCode) => {
  switch (errorCode) {
    default:
      return "Invalid Email or password. Please try again.";
  }
};

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { email, password, error, loading } = values;

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setValues({ ...values, error: "All fields are required!" });
      return;
    }

    setValues({ ...values, error: "", loading: true });

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });

      setValues({
        email: "",
        password: "",
        error: "",
        loading: false,
      });

      navigate("/", { replace: true });
    } catch (error) {
      const errorMessage = handleFirebaseError(error.code);
      setValues({ ...values, error: errorMessage, loading: false });
    }
  };

  return (
    <Container fluid className='p-5 d-flex align-items-center justify-content-center'>
      <Col md='5' className='position-relative'>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
        <form className="shadow rounded p-4 mt-5 form bg-glass" onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <img
              src="../images/logo.png"
              alt="logo"
              width="auto"
              height="50px"
              className="mx-auto d-block"
            />
          </div>
          <h3 className="text-center mb-3 icon-color-3">Log Into Your Account</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label icon-color-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label icon-color-3">
              Password
            </label>
            <InputGroup>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <Button className="bg-light border border-light "
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye className="text-dark" /> : <FaEyeSlash className="text-dark" />}
              </Button>
            </InputGroup>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="text-center mb-3">
            <button
              className="btn btn-secondary btn-sm w-100"
              disabled={loading}>
              LOGIN
            </button>
          </div>
          <div className="text-center mb-3">
            <small>
              <Link className="icon-color-3" to="/auth/forgot-password" style={{ textDecoration: 'none' }}>Forgot Password?</Link>
            </small>
          </div>
        </form>
      </Col>
    </Container>
  );
};

export default Login;