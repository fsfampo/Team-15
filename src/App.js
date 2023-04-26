import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutPrograms from "./pages/WorkoutPrograms";
import Routines from "./pages/Routines";
import Meals from "./pages/Meals";
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
import { gapi } from "gapi-script";
import { Nav } from "react-bootstrap";
import Metrics from "./pages/Metrics";
import MyRoutines from "./pages/MyRoutines";
import MealPlans from "./pages/MealPlans";
import MealPlanMeals from "./pages/MealPlanMeals";
import MyMealPlans from "./pages/MyMealPlans";
import VideoApprovalPage from "./components/VideoApprovalPage";


function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "426633533706-bdr6hmh12goi97n5a6r66fkso4ov5vqd.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
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
              <Routines />
            </>
          } />
          <Route path="/meals" element={
            <>
              <Navbar />
              <Meals />
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
          <Route path="/routines/:routine_id" element={
            <>
              <Navbar />
              <RoutineWorkouts />
            </>
          } />
          <Route path="/meal-plan/:meal_plan_id" element={
            <>
              <Navbar />
              <MealPlanMeals />
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
          } />
          <Route path="/metrics" element={
            <>
              <Navbar />
              <Metrics />
            </>
          } />
          <Route path="/my-routines" element={
            <>
              <Navbar />
              <MyRoutines />
            </>
          } />
          <Route path="/mealPlans" element={
            <>
              <Navbar />
              <MealPlans />
            </>
          } />
          <Route path="/my-meal-plans" element={
            <>
              <Navbar />
              <MyMealPlans />
            </>
          } />
          <Route path="/approval" element={
            <>
              <Navbar />
              <VideoApprovalPage />
            </>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;