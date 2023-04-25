import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WorkoutItem.css"

function WorkoutItem({
  name,
  difficulty,
  views,
  rating,
  duration,
  contentURL,
  imgUrl,
  tags,
  description,
  likes,
  dislikes,
  calories,
  watchedVideos,
  setWatchedVideos,
}) {

  const navigate = useNavigate();

  const handleClick = () => {
    // check if video already exists in watchedVideos
    const videoExists = watchedVideos.includes(contentURL);
    const completedWorkouts = parseInt(localStorage.getItem('completedWorkouts')) || 0;
    if (!videoExists) {
      const watched = [...watchedVideos, contentURL];
      setWatchedVideos(watched);
      localStorage.setItem('watchedVideos', JSON.stringify(watched));
      localStorage.setItem('completedWorkouts', completedWorkouts + 1);
    }

    navigate("/video", {
      state: {
        contentURL,
        videoTitle: name,
        videoDescription: description,
        videoTags: tags,
        videoViews: views,
        videoLikes: likes,
        videoDislikes: dislikes,
        videoRating: rating,
        videoCalories: calories
      }
    });
  };

  const isWatched = watchedVideos.includes(contentURL);
  const itemClass = isWatched ? 'itemContainer watched' : 'itemContainer';

  return (
    <div className={itemClass} onClick={handleClick}>
      <div className="itemImage" style={{ backgroundImage: `url(${imgUrl})`, height: '100%' }}> </div>
      <h1 className="itemTitle"> {name} </h1>
      <p> Level: {difficulty} </p>
      <p className="itemMetrics"> {views} views | {rating} stars | {duration} minutes</p>
      {isWatched && <div className="completed">Completed</div>}
    </div>
  );
}

export default WorkoutItem;
