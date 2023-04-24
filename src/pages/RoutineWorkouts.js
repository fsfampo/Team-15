import React from "react";
import { useLocation } from "react-router-dom";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/PersonalRoutine.css"

function RoutineWorkouts() {
    const { state: { workouts } } = useLocation();

    return (
        <div className="routineContainer">
            {Object.values(workouts).map((workoutArray, index) => (
                <div key={index}>
                    {workoutArray.map((workout) => (
                        <div className="row"  key={workout._id.$oid}>
                            <WorkoutItem
                                name={workout.title}
                                difficulty={workout.difficulty_level}
                                views={workout.views}
                                rating={workout.rating}
                                duration={workout.duration}
                                contentURL={workout.content_url}
                                imgUrl={workout.image_url}
                                tags={workout.tags}
                                description={workout.description}
                                likes={workout.likes}
                                dislikes={workout.dislikes}
                                calories={workout.calories}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default RoutineWorkouts;