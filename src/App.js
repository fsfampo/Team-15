import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutPrograms from "./pages/WorkoutPrograms";
import Meals from "./pages/Meals";
import Metrics from "./pages/Metrics";
import Approval from "./pages/Approval";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/workout-programs" exact component={WorkoutPrograms} />
          <Route path="/meals" exact component={Meals} />
          <Route path="/metrics" exact component={Metrics} />
          <Route path="/approval" exact component={Approval} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
