import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Moment from "react-moment";
import { auth } from "../firebaseConfig";
import useSnapshot from "../utils/useSnapshot";
import { toggleFavorite } from "../utils/fav";
import Sold from "../components/Sold";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const AdCard = ({ ad }) => {
  const { val } = useSnapshot("favorites", ad.adId);

  const adLink = `/${ad.category.toLowerCase()}/${ad.adId}`;

  return (
    <TrackVisibility>
      {({ isVisible }) =>
      <div className={ isVisible? "card position-relative animate__animated animate__slideInUp " : "animate__animated animate__fadeOut"} >
        {ad.isSold && <Sold />}
        <Link to={adLink}>
          <img
            src={ad.images[0].url}
            alt={ad.title}
            className="card-img-top"
            style={{ width: "100%", height: "200px" }}
          />
        </Link>
        <div className="card-body">
          <p className="d-flex justify-content-between align-items-center">
            <small>{ad.category}</small>
            {val?.users?.includes(auth.currentUser?.uid) ? (
              <AiFillHeart
                size={30}
                onClick={() => toggleFavorite(val.users, ad.adId)}
                className="icon-color"
              />
            ) : (
              <AiOutlineHeart
                size={30}
                onClick={() => toggleFavorite(val.users, ad.adId)}
                className="icon-color"
              />
            )}
          </p>
          <Link to={adLink}>
            <h5 className="card-title">{ad.title}</h5>
          </Link>
          <Link to={adLink}>
            <p className="card-text">
              {ad.location} - <Moment fromNow>{ad.publishedAt.toDate()}</Moment>
              <br />
              Skill required: {ad.skill}
            </p>
          </Link>
        </div>
      </div>}
    </TrackVisibility>
  );
};

export default AdCard;
