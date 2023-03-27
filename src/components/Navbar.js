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
        <img src={Logo} />
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/workout-programs"> Workout Programs </Link>
        <Link to="/workout-videos"> Workout Videos </Link>
        <Link to="/meal-plans"> Meal Plans </Link>
        <Link to="/routines"> Routines </Link>
        <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
