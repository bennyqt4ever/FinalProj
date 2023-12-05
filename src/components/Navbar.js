import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebaseConfig";

const Navbar = () => {
  const { user, unread } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = async () => {
    // update user doc
    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    // logout
    await signOut(auth);
    // navigate to login
    navigate("/auth/login");
  };

  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="./images/nav-icon.png"
            alt="logo-text-icon"
            width="auto"
            height="40px"
            className="d-inline-block align-center"
          />
        </Link>
        <button
          className="navbar-toggler text-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    exact
                    activeclassname="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/sell"
                    activeclassname="active"
                  >
                    InterList
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link position-relative"
                    to="/chat"
                    activeclassname="active"
                  >
                    Chat
                    {unread.length ? (
                      <span className="position-absolute top-10 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">
                          New alerts
                        </span>
                      </span>
                    ) : null}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/favorites"
                    activeclassname="active"
                  >
                    <div className="icon-container">
                      <AiFillHeart size={16} className="icon-color" />
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profile/${user.uid}`}
                    activeclassname="active"
                  >
                    <div className="icon-container">
                      <FaUserAlt size={14} className="icon-color" />
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item px-2 py-1">
                <button className="btn btn-sm custom-btn" style={{ width: '70px', height: '35px' }} onClick={handleSignout}>
                  Logout
                </button>
              </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    activeclassname="active"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link"
                    to="/auth/register"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/auth/login"
                    activeclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;