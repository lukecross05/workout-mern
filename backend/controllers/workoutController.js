const Workout = require("../models/Workouts");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  //check for missing fields and add them to array.
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    //respond with error if there are missing fields.
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields: emptyFields });
  }
  try {
    //create a new workout.
    const user_id = req.user._id;
    const workoutCreated = await Workout.create({ title, load, reps, user_id });

    res.status(200).json(workoutCreated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  //grab all the users workouts, sorted by creation date
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};
const veiwWorkouts = async (req, res) => {
  //grab all workouts for the user found by email, sorted by creation date. this is for veiwing another users workouts so isnt protected, but is only available for public profiles.
  const email = req.query.term;
  const user = await User.findOne({ email: email });
  const user_id = user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  console.log(workouts);
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  //get specific workout from ID, never used in frontend.
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  //delete a workout from database.
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  //update a workout, never implemented in frontend.
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isvalid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  veiwWorkouts,
};
