import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkoutPrograms.css";
import Loading from "../components/Loading";
import RoutineItem from "../components/RoutineItem";

function MyRoutines() {
    const [myRoutines, setMyRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    

  useEffect(() => {
    const fetchMyRoutines = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        
        const response = await axios.get(
          `http://gojim-backend.eastasia.cloudapp.azure.com/user_routine/${email}`,
          { email: email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.result);
        setMyRoutines(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMyRoutines();
  }, []);

  console.log(myRoutines); 


  return (
    <div>
      <div className="workoutsContainer">
        {loading ? (
          <Loading />
        ) : (
          myRoutines.map((routine, index) => (
            <RoutineItem
              key={index}
              routine_id={routine.routine_id}
              name={routine.name}
              difficulty={routine.difficulty}
              days={routine.no_days}
              workouts={routine.workouts}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyRoutines;
