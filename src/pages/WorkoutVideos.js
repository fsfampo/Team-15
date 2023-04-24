import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkoutPrograms.css";
import RoutineItem from "../components/RoutineItem";
import Loading from "../components/Loading";

function WorkoutVideos() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="workoutsContainer">
      {loading ? (
        <Loading />
      ) : (
        workouts.map((routine, index) => (
          <RoutineItem
            key={index}
            name={routine.name}
            difficulty={routine.difficulty}
            days={routine.no_days}
            workouts={routine.workouts}
          />
        ))
      )}
    </div>
  );
}

export default WorkoutVideos;
