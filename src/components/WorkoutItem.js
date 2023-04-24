import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WorkoutPrograms.css";

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
  
  return (
    <div className="menuItem" onClick={handleClick}>
      <div style={{ backgroundImage: `url(${imgUrl})`, height: '100%'}}> </div>
      <h1> {name} </h1>
      <p> Level: {difficulty} </p>
      <p className="metrics"> {views} views | {rating} stars | {duration} minutes</p>
    </div>
  );
}

export default WorkoutItem;
