const WorkoutsDetailsVeiwMode = ({ workout }) => {
  const date = new Date(workout.createdAt); //creates date and stores it in three parts.
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
    </div>
  );
};

export default WorkoutsDetailsVeiwMode;
