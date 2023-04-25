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
    const completedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];
    if (!videoExists) {
      const watched = [...watchedVideos, contentURL];
      setWatchedVideos(watched);
      localStorage.setItem('watchedVideos', JSON.stringify(watched));
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

  const completedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];
  const isCompleted = completedVideos.includes(contentURL);
  const itemClass = isCompleted ? 'itemContainer completed' : 'itemContainer';

  return (
    <div className={itemClass} onClick={handleClick}>
      <div className="itemImage" style={{ backgroundImage: `url(${imgUrl})`, height: '100%' }}> </div>
      <h1 className="itemTitle"> {name} </h1>
      <p> Level: {difficulty} </p>
      <p className="itemMetrics"> {views} views | {rating} stars | {duration} minutes</p>
      {isCompleted && <div className="completedContainer"><div className="completed">Completed</div></div>}
    </div>
  );
}

export default WorkoutItem;
