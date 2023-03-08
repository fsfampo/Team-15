import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutPrograms from "./pages/WorkoutPrograms";
import WorkoutVideos from "./pages/WorkoutVideos";
import MealPlans from "./pages/MealPlans";
import Routines from "./pages/Routines";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/workout-programs" exact component={WorkoutPrograms} />
          <Route path="/workout-videos" exact component={WorkoutVideos} />
          <Route path="/meal-plans" exact component={MealPlans} />
          <Route path="/routines" exact component={Routines} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
