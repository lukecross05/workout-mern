const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const createUserProfile = async (req, res) => {
  const userEmail = req.user.email;
  const user = req.user;
  console.log(user);

  const { username, bio, bPublic, picFileType } = req.body;
  console.log(req.file);
  console.log(bio);
  console.log(picFileType);
  console.log(bPublic);
  const token = req.token;
  try {
    const profile = await Profile.createProfile(
      userEmail,
      username,
      bio ? bio : undefined,
      bPublic
    );
    if (req.file) {
      const uploadedFile = req.file;
      const targetPath = path.join(
        __dirname,
        `../public/${username}.${picFileType}`
      );
      fs.rename(uploadedFile.path, targetPath, (err) => {
        if (err) {
          console.error("Error moving file:", err);
        } else {
          console.log("File saved successfully!");
          //create custom profile method update pic or smt
        }
      });

      await Profile.setPic(profile, `${username}.${picFileType}`);
      await profile.save();
    }

    // Update user with profileID
    await User.setObj(user, profile._id);
    await user.save();

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
    //if porfile priv
    const { username, bio, picFile } = existingProfile;
    const profile = { username, bio, picFile };
    console.log(profile);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserProfile, getUserProfile };
