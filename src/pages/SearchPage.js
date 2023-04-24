import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutItem from "../components/WorkoutItem";
import FilterBar from "../components/FilterBar";
import "../styles/WorkoutPrograms.css";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const { state: { workouts, searchQuery} } = useLocation();

  return (
    <div>
      <h1 className="searchHead">Search: {searchQuery} </h1>
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
            imgUrl={workout.image_url}
            tags={workout.tags}
            description={workout.description}
            likes={workout.likes}
            dislikes={workout.dislikes}
            calories={workout.calories}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;