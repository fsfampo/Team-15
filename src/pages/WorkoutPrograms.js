import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutItem from "../components/WorkoutItem";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading"; 
import "../styles/WorkoutPrograms.css";

function WorkoutPrograms() {
  const [workouts, setWorkouts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [watchedVideos, setWatchedVideos] = useState(
    JSON.parse(localStorage.getItem("watchedVideos")) || []
  );

  const filters = ["All", "Recently Watched", "legs", "arms", "back", "hiit", "pilates", "yoga"];

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

    const watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];
    setWatchedVideos(watched);

    fetchWorkouts();
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter === "All" ? null : filter);
    setWatchedVideos(JSON.parse(localStorage.getItem('watchedVideos')) || []);
  };

  let filteredWorkouts;
  if (activeFilter) {
    if (activeFilter === "All") {
      filteredWorkouts = workouts;
    } else if (activeFilter === "Recently Watched") {
      filteredWorkouts = workouts.filter((workout) => watchedVideos.includes(workout.content_url));
    } else {
      filteredWorkouts = workouts.filter(
        (workout) =>
          workout.category === activeFilter ||
          workout.tags.includes(activeFilter)
      );
    }
  } else {
    filteredWorkouts = workouts;
  }

  const handleVideoClick = (contentURL) => {
    // check if video already exists in watchedVideos
    const videoExists = watchedVideos.some(watchedVideo => watchedVideo === contentURL);
    if (!videoExists) {
      const watched = [...watchedVideos, contentURL];
      setWatchedVideos(watched);
      localStorage.setItem('watchedVideos', JSON.stringify(watched));
    }
  };

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
              watchedVideos={watchedVideos}
              setWatchedVideos={setWatchedVideos}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutPrograms;
