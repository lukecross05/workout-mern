const express = require("express");

const router = express.Router();

const { signUpUser, loginUser } = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signUpUser);

//router.get("/search", findUser);

module.exports = router;
