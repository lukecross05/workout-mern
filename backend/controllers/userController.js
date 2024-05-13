const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.logIn(email, password);
    const { profileID } = user;
    const token = createToken(user._id);
    res.status(200).json({ email, token, profileID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    const token = createToken(user._id);
    const { profileID } = user;
    res.status(200);
    res.json({ email, token, profileID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser, loginUser };
