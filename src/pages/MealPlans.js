import React, { useState, useEffect } from "react";
import axios from "axios";
import MealItem from "../components/MealItem";
import "../styles/MealPlans.css";

function MealPlans() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/meals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMeals(response.data.result);
        console.log(response.data.result); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="mealsContainer">
      {meals.map((meal, index) => (
        <div key={index} className="mealContent">
          <h3>{meal.type}</h3>
          <div className="mealItemsContainer">
            {meal.contents.map((content, contentIndex) => (
              <div key={contentIndex} className="mealItemBox">
                <MealItem name={content.recipe} imgUrl={content.image_url} calories={content.calories} servings={content.quantity}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealPlans;
