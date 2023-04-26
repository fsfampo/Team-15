import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import MealItem from "../components/MealItem";

function MealPlanMeals() {
    const { meal_plan_id } = useParams();
    const [meals, setMeals] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://gojim-backend.eastasia.cloudapp.azure.com/meal_plan/${meal_plan_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("data");
                console.log(response.data);
                setTitle(response.data.name);
                setMeals(response.data.meals);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch meals1! Error message: " + error.message);
            }
        };

        fetchMeals();
    }, [meal_plan_id]);

    console.log("title", title);
    console.log("meals", meals);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>{title} Program</h1>
            <div className="mealsContainer">
                {Object.values(meals).map((mealArray, index) => (
                    <div key={index}>
                        {mealArray.map((meal) => (
                            <div className="row" key={meal._id.$oid}>
                                {meal.contents && meal.contents.map((content, index) => (
                                    <MealItem
                                        key={index}
                                        title={content.recipe}
                                        image_url={content.image_url}
                                        calories={content.calories}
                                        quantity={content.quantity}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
}

export default MealPlanMeals;
