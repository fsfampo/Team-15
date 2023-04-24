import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import "../styles/Profile.css";
import img1 from "../assets/signup/bags.jpg";
import img2 from "../assets/signup/band.jpg";

function Profile() {
  const nav = useNavigate();
  const [profile, setProfile] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/users",
          {
            params: { email: email },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.length > 0) {
      setFirstName(profile[0].first_name);
      setLastName(profile[0].last_name);
      setRole(profile[0].role);
      setEmail(profile[0].email);
      setGender(profile[0].gender);
    }
  }, [profile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("watchedVideos"); 
    nav("/login");
  };

  return (
    <div className="profile-container">
      {firstName && lastName ? (
        <>
          <div className="grid-container">
            <div className="grid-item">
              <img className="imageprof" src={img2} alt="First image" />
            </div>
            <div className="grid-item">
              <h1>User Profile</h1>
              <hr />
              <div className="info">
                <h4>Name: {firstName} {lastName}</h4>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
              </div>
              <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
            </div>
            <div className="grid-item">
              <img className="imageprof" src={img1} alt="Second image" />
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Profile;
