import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }

    const workout = { title, reps, load };

    const response = await fetch("http://localhost:4000/api/workouts/", {
      //sends a request to post a new workouts.
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json }); //dispatch to create the workouts in workoutContext.
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create new workout</h3>
      <div className="input-containter">
        <input
          type="text"
          placeholder="Enter Excersize Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <input
          type="number"
          placeholder="Enter Load In Kilograms"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""} //this makes the empty field either inclue load, if its not inputed or if not nothign
        />

        <input
          type="number"
          placeholder="Enter Reps"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
      </div>

      <button className="submitButton"> Submit </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
