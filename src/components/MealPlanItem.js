import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import '../styles/MealPlans.css'
import { useNavigate } from "react-router-dom";

function MealPlanItem({
  image_url,
  meal_plan_id,
  meals,
  name,
  no_days,
  tags
}) {
  const navigate = useNavigate();
  const [userMealPlans, setUserMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMealPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `http://gojim-backend.eastasia.cloudapp.azure.com/user_meal_plan/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data.result)) { // check if it is an array
        const mealIds = response.data.result.map(
          (meals) => meals.meal_plan_id
        );
        setUserMealPlans(mealIds);
        console.log(mealIds);
      } else {
        console.error("Meal Plan not found");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchMealPlans();
  }, []);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      console.log("meal_plan_id");
      console.log(meal_plan_id);
      console.log("userMealPlans");
      console.log(userMealPlans); 
      console.log(Array.isArray(userMealPlans));
      if (userMealPlans.includes(meal_plan_id)) {
        navigate(`/meal-plan/${meal_plan_id}`);
      } else {
        await axios.post(
          `http://gojim-backend.eastasia.cloudapp.azure.com/start_meal_plan/${email}`,
          { meal_plan_id: meal_plan_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/meal-plan/${meal_plan_id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to start meal plan!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mealPlanContainer">
      <div
        className="mealPlanImage"
        style={{ backgroundImage: `url(${image_url})`, height: "100%" }}
      ></div>
      <h1 className="mealPlanTitle"> {name} </h1>
      <p className="mealPlanMetrics"> Duration: {no_days} days</p>
      <button className="mealPlanButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}

export default MealPlanItem;
