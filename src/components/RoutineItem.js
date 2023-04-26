import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import "../styles/Routine.css";
import axios from "axios";

function RoutineItem({ routine_id, name, difficulty, days, workouts }) {
  const navigate = useNavigate();
  const [userRoutines, setUserRoutines] = useState([]);

  const fetchUserRoutines = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `http://gojim-backend.eastasia.cloudapp.azure.com/user_routine/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data.result)) { // check if it is an array
        const routineIds = response.data.result.map(
          (routine) => routine.routine_id
        );
        setUserRoutines(routineIds);
      } else {
        console.error("Routines not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRoutines();
  }, []);
  

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email")
      if (userRoutines.includes(routine_id)) {
        navigate(`/routines/${routine_id}`);
      } else {
        await axios.post(
          `http://gojim-backend.eastasia.cloudapp.azure.com/start_routine/${email}`,
          { routine_id: routine_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/routines/${routine_id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to start routine!");
    }
  };

  return (
    <div className="workoutsContainer">
      <div className="menuItem">
        <h1> {name} </h1>
        <p> Level: {difficulty} </p>
        <p className="duration">Duration: {days} days</p>
        <button className="routineItemButton" onClick={handleClick}>Start</button>
      </div>
    </div>
  );
}

export default RoutineItem;
