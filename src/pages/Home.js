import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/professional.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Welcome Professional </h1>
        <p> Stronger Together 💪</p>
        <Link to="/menu">
          <button> Get Started </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
