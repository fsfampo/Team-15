import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutPrograms from "./pages/WorkoutPrograms";
import WorkoutVideos from "./pages/WorkoutVideos";
import MealPlans from "./pages/MealPlans";
import Routines from "./pages/Routines";
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from "./pages/Chat";
import SignupNavbar from "./components/SignupNavbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import RoutineWorkouts from "./pages/RoutineWorkouts";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordComponent from "./components/ResetPasswordComponent";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={
            <>
              <SignupNavbar />
              <Login />
            </>
          } />
          <Route path="/SignUp" element={
            <>
              <SignupNavbar />
              <Register />
            </>
          } />
          <Route path="/" exact element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/workout-programs" element={
            <>
              <Navbar />
              <WorkoutPrograms />
            </>
          } />
          <Route path="/workout-videos" element={
            <>
              <Navbar />
              <WorkoutVideos />
            </>
          } />
          <Route path="/meal-plans" element={
            <>
              <Navbar />
              <MealPlans />
            </>
          } />
          <Route path="/routines" element={
            <>
              <Navbar />
              <Routines />
            </>
          } />
          <Route path="/chat" element={
            <>
              <Navbar />
              <Chat />
            </>
          } />
          <Route path="/video" element={
            <>
              <Navbar />
              <VideoPage />
            </>
          } />
          <Route path="/routine" element={
            <>
              <Navbar />
              <RoutineWorkouts />
            </>
          } />
          <Route path="/search" element={
            <>
              <Navbar />
              <SearchPage />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Navbar />
              <Profile />
            </>
          } />
          <Route path="/forgotPassword" element={
            <>
              <SignupNavbar />
              <ForgotPassword />
            </>
          } />
          <Route path="/reset-password/*" component={ResetPasswordComponent} element={
            <>
            <SignupNavbar />
            <ResetPasswordComponent />
          </>
          }/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;