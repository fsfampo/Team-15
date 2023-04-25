import { useNavigate } from "react-router-dom";
import "../styles/Routine.css";
import axios from "axios";

function RoutineItem({ routine_id, name, difficulty, days, workouts }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email")
      await axios.post(
        `http://gojim-backend.eastasia.cloudapp.azure.com/start_routine/${email}>`,
        { routine_id: routine_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/routines/${routine_id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to start routine!");
    }
  };

  return (
    <div className="workoutsContainer">
      <div className="menuItem">
        <h1> {name} </h1>
        <p> Level: {difficulty} </p>
        <p className="duration">Duration: {days} days</p>
        <button className="routineItemButton" onClick={handleClick}>Start</button>
      </div>
    </div>
  );
}

export default RoutineItem;
