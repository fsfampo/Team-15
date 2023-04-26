import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkoutItem from "../components/WorkoutItem";
import "../styles/PersonalRoutine.css";
import axios from "axios";
import Loading from "../components/Loading";

function RoutineWorkouts() {
    const { routine_id } = useParams();
    const [workouts, setWorkouts] = useState([]);
    const [title, setTitle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [watchedVideos, setWatchedVideos] = useState(
        JSON.parse(localStorage.getItem("watchedVideos")) || []
    );
    const [completedVideos, setCompletedVideos] = useState(
        JSON.parse(localStorage.getItem("completedVideos")) || []
    );

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://gojim-backend.eastasia.cloudapp.azure.com/routine/${routine_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setTitle(response.data.name);
                setWorkouts(response.data.workouts);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch workouts!");
            }
        };

        const watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];
        setWatchedVideos(watched);

        const completed = JSON.parse(localStorage.getItem('completedVideos')) || [];
        setCompletedVideos(completed);

        fetchWorkouts();
    }, [routine_id]);

    if (isLoading) {
        return <Loading />;
    }

    const handleVideoClick = (contentURL) => {
        // check if video already exists in watchedVideos
        const videoExists = watchedVideos.some(watchedVideo => watchedVideo === contentURL);
        if (!videoExists) {
            const watched = [...watchedVideos, contentURL];
            setWatchedVideos(watched);
            localStorage.setItem('watchedVideos', JSON.stringify(watched));
        }
    };

    

    return (
        <div>
            <h1>{title} Program</h1>
            <div className="routineContainer">
                {Object.values(workouts).map((workoutArray, index) => (
                    <div key={index}>
                        {workoutArray.map((workout) => (
                            <div className="row" key={workout._id.$oid}>
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
                                    watchedVideos={watchedVideos}
                                    setWatchedVideos={setWatchedVideos}
                                    completedVideos={completedVideos}
                                    setCompletedVideos={setCompletedVideos}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoutineWorkouts;
