import React from "react";
import { WorkoutVideoList } from "../helpers/WorkoutVideoList";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/WorkoutVideo.css";

function WorkoutVideos() {
  return (
    <div className="video">
      <h1 className="videoTitles">Workouts</h1>
      <h2>Workout w/ Professionals & Celebrities Here!</h2>
      <div className="videoList">
        {WorkoutVideoList.map((workoutVideo, key) => {
          return (
            <WorkoutItem
              key={key}
              image={workoutVideo.image}
              name={workoutVideo.name}
              difficulty={workoutVideo.difficulty}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WorkoutVideos;
