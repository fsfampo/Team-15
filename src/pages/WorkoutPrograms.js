import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutItem from "../components/WorkoutItem";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading"; // added
import "../styles/WorkoutPrograms.css";

function WorkoutPrograms() {
  const [workouts, setWorkouts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // added
  const filters = ["All", "legs", "arms", "back", "hiit", "pilates", "yoga"];

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/content",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkouts(response.data.result);
        setIsLoading(false); // set isLoading to false after fetching data
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter === "All" ? null : filter);
  };

  const filteredWorkouts = activeFilter
    ? activeFilter === "All"
      ? workouts
      : workouts.filter(
          (workout) =>
            workout.category === activeFilter ||
            workout.tags.includes(activeFilter)
        )
    : workouts;

  return (
    <div>
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterClick={handleFilterClick}
        title="Filters"
      />
      {isLoading ? ( // render the Loading component while fetching data
        <Loading />
      ) : (
        <div className="workoutsContainer">
          {filteredWorkouts.map((workout, index) => (
            <WorkoutItem
              key={index}
              name={workout.title}
              difficulty={workout.difficulty_level}
              views={workout.views}
              rating={workout.rating}
              duration={workout.duration}
              contentURL={workout.content_url}
              imgUrl={workout.image_url}
              tags={workout.tags}
              description={workout.description}
              likes={workout.likes}
              dislikes={workout.dislikes}
              calories={workout.calories}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutPrograms;
