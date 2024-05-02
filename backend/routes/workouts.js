const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

const requireAuth = require('../middleware/requireAuth')

//require authentication to access routes

const router = express.Router();

router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a new workout
router.delete("/:id", deleteWorkout);

// UPDATE an existing workout
router.patch("/:id", updateWorkout);

module.exports = router;