import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import SearchWorkouts from "../Components/searchWorkouts";
import WorkoutForm from "../Components/workoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Workouts = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    //fetches workouts from backend.
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          console.log("error fetching data");
        }

        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workout-form">
        <WorkoutForm />
      </div>
      <div className="spacing"></div>
      <div>
        <SearchWorkouts />
      </div>
    </div>
  );
};

export default Workouts;
