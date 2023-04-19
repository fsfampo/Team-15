import React from "react";
import { MealList } from "../helpers/MealList";
import MealItem from "../components/MealItem";
import "../styles/Menu.css";

function Meals() {
  return (
    <div className="menu">
      <h1 className="menuTitle">Meals</h1>
      <div className="menuList">
        {MealList.map((mealItem, key) => {
          return (
            <MealItem
              key={key}
              image={mealItem.image}
              name={mealItem.name}
              views={mealItem.views}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Meals;
