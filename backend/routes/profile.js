const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createUserProfile,
  getUserProfile,
} = require("../controllers/profileController");

const requireAuth = require("../middleware/requireAuth");

const uploadDir = path.join(__dirname, "../public");
const upload = multer({ dest: uploadDir });

const router = express.Router();

router.use(requireAuth);

router.get("/profile/:id", getUserProfile);

router.post("/profile", upload.single("picFile"), createUserProfile);

module.exports = router;
