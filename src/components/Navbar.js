import React, { useState } from "react";
import Logo from "../assets/goJimLogo.jpg";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Navbar.css"

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/"><img src={Logo} alt="GoJim Logo" /></Link>
        <h3 className="welcomeMsg">Welcome, {localStorage.getItem('email').split("@")[0]}</h3>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/workout-programs"> Workout Programs </Link>
        <Link to="/workout-videos"> Routines </Link>
        <Link to="/meal-plans"> Meal Plans </Link>
        <Link to="/chat"> Chat </Link>
        <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
