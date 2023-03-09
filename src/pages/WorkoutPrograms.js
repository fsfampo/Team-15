import React from "react";
import { WorkoutList } from "../helpers/WorkoutList";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/Workout.css";

function WorkoutPrograms() {
  return (
    <div className="menu">
      <h1 className="menuTitle">Workouts</h1>
      <div className="menuList">
        {WorkoutList.map((workoutItem, key) => {
          return (
            <WorkoutItem
              key={key}
              image={workoutItem.image}
              name={workoutItem.name}
              difficulty={workoutItem.difficulty}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WorkoutPrograms;
