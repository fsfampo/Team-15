import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkoutPrograms.css";
import RoutineItem from "../components/RoutineItem";
import Loading from "../components/Loading";
import FilterBar from "../components/FilterBar";

function Routines() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = ["All", "Recently Started"];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter === "All" ? null : filter);
  };

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

  console.log(workouts); 

  return (
    <div>
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterClick={handleFilterClick}
        title="Filters"
      />
      <div className="workoutsContainer">
        {loading ? (
          <Loading />
        ) : (
          workouts.map((routine, index) => (
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

export default Routines;
