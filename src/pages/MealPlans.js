import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import MealPlanItems from "../components/MealPlanItem";

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://gojim-backend.eastasia.cloudapp.azure.com/meal_plan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.result);
        setMealPlans(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  return (
    <div className="workoutsContainer">
        {loading ? (
          <Loading />
        ) : (
          mealPlans.map((mealPlan, index) => (
            <MealPlanItems
              key={index}
              image_url={mealPlan.image_url}
              meal_plan_id={mealPlan.meal_plan_id}
              name={mealPlan.name}
              no_days={mealPlan.no_days}
              tags={mealPlan.tags}
            />
          ))
        )}
      </div>
  );
}

export default MealPlans;
