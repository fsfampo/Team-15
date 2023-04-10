import React from "react";

function MealItem({ image, name, views }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> {views} </p>
    </div>
  );
}

export default MealItem;
