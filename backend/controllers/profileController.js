const Profile = require("../models/profileModel");
const User = require("../models/userModel");

const createUserProfile = async (req, res) => {
  const userEmail = req.user.email;
  const user = req.user;
  console.log(user);

  const { username, bio } = req.body;
  const token = req.token;
  console.log(token);
  try {
    const profile = await Profile.createProfile(
      userEmail,
      username,
      bio ? bio : undefined
    );
    console.log(profile._id);
    await User.setObj(user, profile._id);
    await user.save();
    console.log(user.profileID);
    const updatedUser = await User.findById(user._id);
    const { email, profileID } = updatedUser;
    res.status(201).json({ email, token, profileID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  console.log("get prof");
  const userProfileID = req.params.id;
  try {
    const existingProfile = await Profile.findOne({ _id: userProfileID });
    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const { username, bio } = existingProfile;
    const profile = { username, bio };
    console.log(profile);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserProfile, getUserProfile };
