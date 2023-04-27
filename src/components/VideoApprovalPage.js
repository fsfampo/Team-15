import React, { useState, useEffect } from "react";
import "../styles/Video.css";
import axios from 'axios';

function VideoApprovalPage() {
  const [content, setContent] = useState({});
  const [status, setStatus] = useState("pending");
  const token = localStorage.getItem("token");

  const handleApprove = () => {
    setStatus("approved");

    axios.post(
      "http://gojim-backend.eastasia.cloudapp.azure.com/admin/content",
      { 
        title: content.title, 
        description: content.description, 
        type: content.type, 
        content_url: content.content_url, 
        views: content.views, 
        dislikes: content.dislikes, 
        likes: content.likes, 
        rating: content.rating, 
        duration: content.duration, 
        difficulty_level: content.difficulty_level, 
        trainer: content.trainer, 
        image_url: content.image_url, 
        type_of_workout: content.type_of_workout, 
        tags: content.tags, 
        calories: content.calories, 
        status: "approved"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        setContent(response.data);
        setStatus(response.data.status);
      })
      .catch((error) => console.log(error));
  };

  const handleReject = () => {
    setStatus("rejected");
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          'http://gojim-backend.eastasia.cloudapp.azure.com/admin/content',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContent(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="video-approval-page">
      <h1>Video Approval </h1>
      {/* <div className="video-thumbnail">
        <img src={content.image_url} alt={content.title} />
      </div>
      <div className="video-actions">
        <button className="approve-button" onClick={handleApprove}>
          Approve
        </button>
        <button className="reject-button" onClick={handleReject}>
          Reject
        </button>
      </div>
      <p>Status: {status}</p> */}

      <div className="video-thumbnail">
        <img src={"https://www.mensjournal.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1152/MTk2MTM3Mjg3NjkxNjc1MTQx/man-exercising-in-gym.webp"} alt={content.title} />
      </div>
      <div >
        <p>Full Body Workout for Beginners</p>
        <p>This workout is perfect for beginners who want to improve their fitness levels.</p>
        <p>Duration: 30 min</p>
        <p>Difficulty: Beginner</p>
        <p>Trainer: Johhn Smith</p>
        
      </div>
      <div className="video-actions">
        <button className="approve-button" onClick={handleApprove}>
          Approve
        </button>
        <button className="reject-button" onClick={handleReject}>
          Reject
        </button>
      </div>
      <p>Status: {status}</p>

      
    </div>
  );
}

export default VideoApprovalPage;
