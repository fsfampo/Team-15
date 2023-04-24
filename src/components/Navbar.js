import React, { useState } from "react";
import Logo from "../assets/goJimLogo.jpg";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import SearchBar from "./SearchBar";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/"><img src={Logo} alt="GoJim Logo" /></Link>
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
