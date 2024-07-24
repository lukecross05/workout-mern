import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  //define a state variable 'workouts' and a function 'setWorkouts' to update it
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  //useeffect hook to perform side effects in function components

  return (
    <div className="home">
      <h1>Workout Buddy</h1>
      <p1>Workout tracker & social media application</p1>
    </div>
  );
};

export default Home;
