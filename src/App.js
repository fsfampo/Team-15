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
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={
            <>
              <SignupNavbar/>
              <Login />
            </>
          } />
          <Route path="/SignUp" element={
            <>
              <SignupNavbar/>
              <Register />
            </>
          } />
          <Route path="/" exact element={
            <>
              <Navbar />
              <Home/>
            </>
          }/>
          <Route path="/workout-programs" element={
            <>
              <Navbar />
              <WorkoutPrograms/>
            </>
          }/>
          <Route path="/workout-videos" element={
            <>
              <Navbar />
              <WorkoutVideos />
            </>
          } />
          <Route path="/meal-plans" element={
            <>
              <Navbar/>
              <MealPlans/>
            </>
          } />
          <Route path="/routines"  element={
            <>
              <Navbar/>
              <Routines/>
            </>
          } />
          <Route path="/chat"  element={
            <>
              <Navbar/>
              <Chat/>
            </>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;