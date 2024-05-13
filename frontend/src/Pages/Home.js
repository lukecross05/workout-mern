import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../Components/workoutsDetails";
import WorkoutForm from "../Components/workoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  //define a state variable 'workouts' and a function 'setWorkouts' to update it
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  //useeffect hook to perform side effects in function components
  useEffect(() => {
    //define an asynchronous function to fetch data
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format: Expected JSON");
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
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Home;
