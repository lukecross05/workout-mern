const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}; //create a web token with the id passed.

const loginUser = async (req, res) => {
  const { email, password } = req.body; //grab the email & password.
  try {
    const user = await User.logIn(email, password); //try and log in with credentials passed.
    const { profileID } = user;
    const token = createToken(user._id); //if succesful create token.
    res.status(200).json({ email, token, profileID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    const token = createToken(user._id); //sign up user.
    const { profileID } = user; //will be undefined, as the user wont be able to create a profile untill signing up, but take it anyway so we can change it when the user does make a profile.
    res.status(200);
    res.json({ email, token, profileID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser, loginUser };
