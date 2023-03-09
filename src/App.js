import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutPrograms from "./pages/WorkoutPrograms";
import WorkoutVideos from "./pages/WorkoutVideos";
import MealPlans from "./pages/MealPlans";
import Routines from "./pages/Routines";
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Register />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/workout-programs" element={<WorkoutPrograms/>} />
          <Route path="/workout-videos" element={<WorkoutVideos />} />
          <Route path="/meal-plans" element={<MealPlans/>} />
          <Route path="/routines"  element={<Routines/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;