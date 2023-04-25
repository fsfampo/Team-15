import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import "../styles/VideoPage.css";

function VideoPage() {
  const { state: { contentURL, videoTitle, videoDescription, videoTags, 
    videoViews, videoLikes, videoDislikes, videoRating, videoCalories } } = useLocation();
  const videoId = contentURL.split("v=")[1];
  const tagsArray = videoTags.split(",").map(tag => `#${tag.trim()}`);
  
  const [watchedWholeVideo, setWatchedWholeVideo] = useState(false);

  useEffect(() => {
    if (watchedWholeVideo) {
      const completedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];
      if (!completedVideos.includes(contentURL)) {
        completedVideos.push(contentURL);
        localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
      }
    }
  }, [watchedWholeVideo, contentURL]);

  const onEnd = (event) => {
    setWatchedWholeVideo(true);
  }

  return (
    <div className="videoPage">
      <h1 className="videoTitle">{videoTitle}</h1>
      <div className="videoBox">
        <YouTube className="videoPlayer" videoId={videoId} onEnd={onEnd} />
      </div>
      <p className="videoDescription">{videoDescription}</p>
      <div className="videoDetails">
        <p>{videoViews} views | {videoLikes} likes | {videoDislikes} dislikes | {videoRating} rating | {videoCalories} calories burnt</p>
      </div>
      <ul className="videoTags">
        {tagsArray.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      {watchedWholeVideo && <p>You watched the whole video!</p>}
    </div>
  );
}

export default VideoPage;
