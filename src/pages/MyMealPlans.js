import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkoutPrograms.css";
import Loading from "../components/Loading";
import MealPlanItem from "../components/MealPlanItem";

function MyMealPlans() {
    const [myMealPlans, setMyMealPlans] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMyMealPlans = async () => {
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");

                const response = await axios.get(
                    `http://gojim-backend.eastasia.cloudapp.azure.com/user_meal_plan/${email}`,
                    { email: email },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data.result);
                setMyMealPlans(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchMyMealPlans();
    }, []);

    console.log(myMealPlans);


    return (
        <div>
            <div className="workoutsContainer">
                {loading ? (
                    <Loading />
                ) : (
                    myMealPlans.map((mealPlan, index) => (
                        <MealPlanItem
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
        </div>
    );
}

export default MyMealPlans;
