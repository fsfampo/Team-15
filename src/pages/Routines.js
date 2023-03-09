import React from "react";
import WorkoutTwo from "../assets/workoutTwo.png";
import "../styles/Routines.css";
function Routines() {
  const date = new Date();
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${WorkoutTwo})` }}
      ></div>
      <div className="aboutBottom">
        <h1> Your Progress 💪 </h1>
        <h2> Your Goal: 1200 Calories Burnt/Day</h2>
        <h2> Today: 1400 Calories Burnt/Day</h2>
        <ul>
          <li> <b>Monday:</b> Arms |</li>
          <li> <b>Tuesday:</b> Legs |</li>
          <li> <b>Wednesday:</b> Back |</li>
          <li> <b>Thursday:</b> Rest |</li>
          <li> <b>Friday:</b> Arms |</li>
          <li> <b>Saturday:</b> Legs |</li>
          <li> <b>Sunday:</b> Rest</li>
        </ul>
        <ul>
          <li> <b>Monday:</b> Weight Loss |</li>
          <li> <b>Tuesday:</b> Bulking |</li>
          <li> <b>Wednesday:</b> Weight Gain |</li>
          <li> <b>Thursday:</b> Lean Bulk |</li>
          <li> <b>Friday:</b> Bulking |</li>
          <li> <b>Saturday:</b> Lean |</li>
          <li> <b>Sunday:</b> Cutting </li>
        </ul>
      </div>
    </div>
  );
}

export default Routines;