import React, { useState, useEffect } from "react";
import Logo from "../assets/goJimLogo.jpg";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Navbar.css"
import { CgProfile } from "react-icons/cg";
import axios from "axios";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/users",
          {
            params: { email: email },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.result[0].first_name);
        setRole(response.data.result[0].role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, []);
  if(role === "user"){
    return (
      <div className="navbar">
        <div className="leftSide" id={openLinks ? "open" : "close"}>
          <Link to="/"><img src={Logo} alt="GoJim Logo" /></Link>
          <h3 className="welcomeMsg">Welcome, {name}</h3>
        </div>
        <div className="rightSide">
          <Link to="/"> Home </Link>
          <Link to="/workout-programs"> Workouts </Link>
          <Link to="/workout-videos"> Routines </Link>
          <Link to="/mealPlans"> Meals </Link>
          <Link to="/chat"> Chat </Link>
          <SearchBar />
          <Link to="/profile">
            <CgProfile className="profileicon" style={{ color: 'white' }} />
          </Link>
        </div>
      </div>
    );
  }
  if(role === "trainer"){
    return (
      <div className="navbar">
        <div className="leftSide" id={openLinks ? "open" : "close"}>
          <Link to="/"><img src={Logo} alt="GoJim Logo" /></Link>
          <h3 className="welcomeMsg">Welcome, {name}</h3>
        </div>
        <div className="rightSide">
          <Link to="/"> Home </Link>
          <Link to="/"> Upload content </Link>
          <Link to="workout-programs/"> My content </Link>
          <Link to="/chat"> Chat </Link>
          <SearchBar />
          <Link to="/profile">
            <CgProfile className="profileicon" style={{ color: 'white' }} />
          </Link>
        </div>
      </div>
    );
  }
  if(role === "admin"){
    return (
      <div className="navbar">
        <div className="leftSide" id={openLinks ? "open" : "close"}>
          <Link to="/"><img src={Logo} alt="GoJim Logo" /></Link>
          <h3 className="welcomeMsg">Welcome, {name}</h3>
        </div>
        <div className="rightSide">
          <Link to="/"> Home </Link>
          <Link to="/metrics"> Metrics </Link>
          <Link to="/"> Approve Content </Link>
          <Link to="/chat"> Chat </Link>
          <SearchBar />
          <Link to="/profile">
            <CgProfile className="profileicon" style={{ color: 'white' }} />
          </Link>
        </div>
      </div>
    );
  }

  
}

export default Navbar;
