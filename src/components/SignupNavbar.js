import React, { useState } from "react";
import Logo from "../assets/goJimLogo.jpg";
import { Link } from "react-router-dom";
import "../styles/SignupNavbar.css";
import SearchBar from "./SearchBar";

function SignupNavbar() {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/signup"><img src={Logo} alt="GoJim Logo" /></Link>
      </div>
      <div className="rightSide">
        <Link to="/signup"> Sign Up </Link>
        <Link to="/login"> Log In </Link>
      </div>
    </div>
  );
}

export default SignupNavbar;
