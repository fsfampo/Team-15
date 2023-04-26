import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MealItem({ title, image_url, calories, quantity}) {

  return (
    <div className="menuItem">
    <h1 className="mealTitle">{title}</h1>
      <div style={{ backgroundImage: `url(${image_url})`, height: '100%'}}> </div>
      <p>calories: {calories} | servings: {quantity}</p>
    </div>
  );
}

export default MealItem;