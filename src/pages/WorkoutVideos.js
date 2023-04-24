import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkoutPrograms.css";
import RoutineItem from "../components/RoutineItem";

function WorkoutVideos() {
  const [workouts, setWorkouts] = useState([]);
  console.log(workouts); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/routine",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkouts(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="workoutsContainer">
    {workouts.map((routine, index) => (
      <RoutineItem
        key={index}
        name={routine.name}
        difficulty={routine.difficulty}
        days={routine.no_days}
        workouts={routine.workouts}
      />
    ))}
  </div>
  );
}

export default WorkoutVideos;
