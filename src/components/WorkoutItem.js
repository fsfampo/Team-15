import React from "react";

function WorkoutItem({ image, name, difficulty }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> {difficulty} </p>
    </div>
  );
}

export default WorkoutItem;
