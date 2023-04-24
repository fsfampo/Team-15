import { useNavigate } from "react-router-dom";
import "../styles/Routine.css";

function RoutineItem({ name, difficulty, days, workouts}) {
  const navigate = useNavigate();

 const handleClick = () => { 
    navigate("/routine", { state: { workouts, name } });
     };

  return (
    <div className="workoutsContainer">
      <div className="menuItem">
        <h1> {name} </h1>
        <p> Level: {difficulty} </p>
        <p>Number of Days: {days}</p>
        <button className="routineItemButton" onClick={handleClick}>Start</button>
      </div>
    </div>
  );
}

export default RoutineItem;