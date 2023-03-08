import React from "react";
import { MealList } from "../helpers/MealList";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/Workout.css";

function MealPlans() {
  return (
    <div className="menu">
      <h1 className="menuTitle">Meal Plans</h1>
      <div className="menuList">
        {MealList.map((mealItem, key) => {
          return (
            <WorkoutItem
              key={key}
              image={mealItem.image}
              name={mealItem.name}
              difficulty={mealItem.difficulty}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MealPlans;