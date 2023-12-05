import React, { useState, useEffect, useCallback } from "react";
import { collection, orderBy, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AdCard from "../components/AdCard";
import Carousel from "../components/CarouselPage";
import Footers from "../components/Footers";
import HomeContainer from "../components/HomeContainer";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");

  const getAds = useCallback(async () => {
    const adsRef = collection(db, "ads");
    let q;
    if (filter !== "") {
      q = query(
        adsRef,
        where("category", "==", filter),
        orderBy("publishedAt", "desc")
      );
    } else {
      q = query(adsRef, orderBy("publishedAt", "desc"));
    }
    const adDocs = await getDocs(q);
    let ads = [];
    adDocs.forEach((doc) => ads.push({ ...doc.data() }));
    setAds(ads);
  }, [filter]);

  useEffect(() => {
    getAds();
  }, [getAds]);

  return (
    <div>
      <Carousel />
      <HomeContainer />
      <div className="mt-5 container">
        <div className="d-flex align-center mb-3">
          <div className="">
            <h5>Filter By Category</h5>
            <select
              className="form-select"
              style={{ width: "200px", margin: "auto" }}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Writing">Writing</option>
              <option value="Public Speaking">Public Speaking</option>
              <option value="Programming">Programming</option>
              <option value="Music">Music</option>
              <option value="Dancing">Dancing</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
        </div>
        <h3 className="icon-color-3">Recent Posts</h3>
        <div className="row">
          {ads.map((ad) => (
            <div className="col-sm-6 col-md-4 col-xl-3 mb-3" key={ad.adId}>
              <AdCard ad={ad} />
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
      <Footers />
    </div>
  );
};

export default Home;