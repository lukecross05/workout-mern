const express = require("express");

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  veiwWorkouts,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/veiw", veiwWorkouts);

router.use(requireAuth); //protect routes.

router.get("/", getWorkouts); //all routes for workouts.

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
