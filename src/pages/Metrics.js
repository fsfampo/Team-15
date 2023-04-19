import React from "react";
import MultiplePizzas from "../assets/activity.jpg";
import "../styles/About.css";
function Metrics() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="aboutBottom">
        <h1> Metrics</h1>
        <p>User Count: # </p>
        <p>Number of Workouts: # </p>
        <p>Number of Meal Plans: #</p>
        <p>Average Time on Page: #</p>
      </div>
    </div>
  );
}

export default Metrics;