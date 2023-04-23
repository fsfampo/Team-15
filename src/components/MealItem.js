import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MealPlans.css";

function MealItem({ name, imgUrl, calories, servings}) {

  return (
    <div className="menuItem">
      <h1> {name} </h1>
      <div style={{ backgroundImage: `url(${imgUrl})`, height: '100%'}}> </div>
      <p>calories: {calories} | servings: {servings}</p>
    </div>
  );
}

export default MealItem;