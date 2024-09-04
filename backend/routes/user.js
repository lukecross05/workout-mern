const express = require("express");

const router = express.Router(); //all routes for user.

const { signUpUser, loginUser } = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signUpUser);

module.exports = router;
