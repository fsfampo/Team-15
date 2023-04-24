import React from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "../styles/VideoPage.css";

function VideoPage() {
    const { state: { contentURL, videoTitle, videoDescription, videoTags, 
      videoViews, videoLikes, videoDislikes, videoRating, videoCalories } } = useLocation();
    const videoId = contentURL.split("v=")[1];
    const tagsArray = videoTags.split(",").map(tag => `#${tag.trim()}`);

    console.log("Video State: " + contentURL); 
  
    return (
      <div className="videoPage">
        <h1 className="videoTitle">{videoTitle}</h1>
        <div className="videoBox">
          <YouTube className="videoPlayer" videoId={videoId} />
        </div>
        <p className="videoDescription">{videoDescription}</p>
        <div className="videoDetails">
          <p>{videoViews} views | {videoLikes} likes | {videoDislikes} dislikes | {videoRating} rating | {videoCalories} calories burnt</p>
        </div>
        <ul className="videoTags">
          {tagsArray.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    );
  }
export default VideoPage;