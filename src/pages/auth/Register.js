
import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { 
  Container,
  Row, 
  Col,} from 'react-bootstrap';


const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, confirmPassword, error, loading } = values;

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setValues({ ...values, error: "All fields are required!" });
      return;
    }
    if (password !== confirmPassword) {
      setValues({ ...values, error: "Password must match!" });
      return;
    }

    setValues({ ...values, error: "", loading: true });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        loading: false,
      });

      navigate("/", {replace: true});
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };


  return (
    <Container fluid className='p-5'>
      <Row>
        <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Join Now <br />
            <span className="icon-color-3">and Pursue Mastery!</span>
          </h1>
            <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            At Intersect, we're not just a platform; we're your partners in the journey to 
            skill mastery. Your dreams are valuable, and we're here to help you turn them 
            into reality. Ready to embark on a transformative learning experience? Join Intersect
            today and let's turn your aspirations into achievements!
            </p>
        </Col>
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
            <h3 className="text-center mb-2 icon-color-3">Create An Account</h3>
            <div className="mb-3 ">
              <label htmlFor="name" className="form-label icon-color-3">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label icon-color-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label icon-color-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            {error ? <p className="text-center text-danger">{error}</p> : null}
            <div className="text-center mb-1">
              <button className="btn btn-secondary btn-sm mb-1 w-100" disabled={loading}>
                REGISTER
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
