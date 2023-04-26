import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/PersonalNav.css";

function PersonalNav() {
  return (
    <nav className="personal-nav">
      <div className="personal-nav-item">
        <NavLink to="/my-routines">
          My Routines
        </NavLink>
      </div>
      <div className="personal-nav-item">
        <NavLink to="/my-meal-plans">
          My Meal Plans
        </NavLink>
      </div>
    </nav>
  );
}

export default PersonalNav;
