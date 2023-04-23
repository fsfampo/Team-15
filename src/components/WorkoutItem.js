import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WorkoutPrograms.css";
import VideoPage from "../pages/VideoPage";

function WorkoutItem({ name, difficulty, views, rating, duration, contentURL, imgUrl, tags, description, likes, dislikes, calories}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/video", { state: { contentURL, videoTitle: name, videoDescription: description, videoTags: tags, videoViews: views, 
    videoLikes: likes, videoDislikes: dislikes, videoRating: rating, videoCalories: calories} });
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