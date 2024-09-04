import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useEffect, useState } from "react";
import WorkoutDetails from "./workoutsDetails";

const SearchWorkouts = () => {
  const { workouts } = useWorkoutsContext();
  const [currentSearch, setCurrentSearch] = useState("");
  const [visableWorkouts, setVisableWorkouts] = useState("");

  useEffect(() => {
    //if theres no term, set as all workouts.
    if (currentSearch.length === 0) {
      setVisableWorkouts(workouts);
    }
  });

  const handleInputChange = async (e) => {
    const searchItem = e.target.value;
    setCurrentSearch(e.target.value);

    if (searchItem.length > 0) {
      //go through workouts and find the ones which match the search term.
      const workoutsToShow = workouts.filter((workout) =>
        compareToSearchTerm(workout.title.toLowerCase(), searchItem)
      );
      setVisableWorkouts(workoutsToShow);
    } else {
      //if search term is empty, show all workouts.
      setVisableWorkouts(workouts);
    }
  };
  const compareToSearchTerm = (workout, term) => {
    return workout.includes(term);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search workouts"
        onChange={handleInputChange}
      />
      <div className="spacing"></div>
      <div className="workouts">
        {visableWorkouts &&
          visableWorkouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default SearchWorkouts;
