const express = require("express");
const {
  createUserProfile,
  getUserProfile,
} = require("../controllers/profileController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/profile/:id", getUserProfile);

router.post("/profile", createUserProfile);

module.exports = router;
