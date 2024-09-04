import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutsDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      //requset to delete a workout.
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json }); //dispatch to delete it from context.
    }
  };
  const date = new Date(workout.createdAt); //creates date and stores in three parts.
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} : ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p className="detail-text">
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p className="detail-text">
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="detail-text">{formattedDate}</p>
      <button onClick={handleClick} className="delete-text">
        Delete
      </button>
    </div>
  );
};

export default WorkoutsDetails;
