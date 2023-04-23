import React from "react";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/WorkoutPrograms.css";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

function WorkoutPrograms() {
  const [workouts, setWorkouts] = useState([]);
  const CONTENT_URL = "http://gojim-backend.eastasia.cloudapp.azure.com/content";
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    axios.get(CONTENT_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setWorkouts(response.data.result);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="workoutsContainer">
      {workouts.map((workout, index) => (
        <WorkoutItem
          key={index}
          name={workout.title}
          difficulty={workout.difficulty_level}
          views={workout.views}
          rating={workout.rating}
          duration={workout.duration}
          contentURL={workout.content_url}
        />
      ))}
    </div>
  );
}

export default WorkoutPrograms;
