import { signOut } from "firebase/auth";
import { doc, updateDoc, } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebaseConfig";
import { AiFillHeart } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";


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
    <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sm ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
          src= "./images/nav-icon.png"
          alt = "logo-text-icon"
          width= "auto"
          height="40px"
          className="d-inline-block alaign-center"
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
                    <Link className="nav-link" to={`/`}>
                      Home
                    </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/sell`}>
                    InterList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/chat">
                     Chat
                    {unread.length ? (
                      <span className="position-absolute top-10 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                    ) : null}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/favorites`}>
                    <div className="icon-container">
                      < AiFillHeart  size={19} className="icon-color"/>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${user.uid}`}>
                    <div className="icon-container">
                    <FaUserAlt size={16} className="icon-color"/>
                    </div>
                  </Link>
                </li>
                <button
                  className="btn  btn-sm"
                  onClick={handleSignout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="nav-item">
                    <Link className="nav-link" to={`/about`}>
                      About
                    </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">
                    Login
                  </Link>
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
