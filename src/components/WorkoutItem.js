import React, { useRef, useState, useEffect } from "react";
import "../styles/WorkoutPrograms.css";
import arms from "../assets/workout/arms.jpg";
import arms2 from "../assets/workout/armsTwo.jpg";
import arms3 from "../assets/workout/armsThree.jpg";
import back from "../assets/workout/back.jpg";
import back2 from "../assets/workout/backTwo.jpg";
import back3 from "../assets/workout/backThree.jpg";
import legs from "../assets/workout/legs.jpg";
import legs2 from "../assets/workout/legsTwo.jpg";
import legs3 from "../assets/workout/legsThree.jpg";
import wk1 from "../assets/workout/wk1.jpg";
import wk3 from "../assets/workout/wk2.jpg";
import wk2 from "../assets/workout/wk3.jpg";

const workoutImages = [arms, arms2, arms3, back, back2, back3, legs, legs2, legs3, wk1, wk2, wk3];

function WorkoutItem({name, difficulty, views, rating, duration, contentURL}) {
  
  const handleClick = () => {
    window.location.href = contentURL;
  };

  const imageIndex = Math.floor(Math.random() * workoutImages.length);
  const imagePath = workoutImages[imageIndex];

  return (
    <div className="menuItem" onClick={handleClick}>
      <div style={{ backgroundImage: `url(${imagePath})`, height: '100%'}}> </div>
      <h1> {name} </h1>
      <p> Level: {difficulty} </p>
      <p> {views} views | {rating} stars | {duration} minutes</p>
    </div>
  );
}

export default WorkoutItem;