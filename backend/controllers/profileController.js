const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const createUserProfile = async (req, res) => {
  const userEmail = req.user.email;
  const user = req.user;

  const { username, bio, bPublic, picFileType } = req.body;

  const picPath = `${username}.${picFileType}`;
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

      await Profile.setPic(profile, picPath);
      await profile.save();
    }

    // Update user with profileID
    await User.setObj(user, profile._id);
    await user.save();

    const updatedUser = await User.findById(user._id);
    const { email, profileID } = updatedUser;

    res.status(201).json({
      newEmail: email,
      newToken: token,
      newProfileID: profileID,
      newUsername: username,
      newBio: bio,
      newPicPath: picPath,
    });
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
const updateProfile = async (req, res) => {
  console.log(req.body);
  const username = req.params.id;
  const { bio, bPublic, picFileType, email } = req.body;

  const profileToUpdate = { username, bio, bPublic, email };

  const picPath = `${username}.${picFileType}`;
  const token = req.token;
  try {
    const profile = await Profile.findOneAndUpdate(
      { username: username },
      profileToUpdate,
      { new: true }
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
      deleteDuplicateWithDifferentExtension(
        picFileType,
        username,
        (err, message) => {
          if (err) {
            console.error("Error:", err);
          } else {
            console.log(message);
            // Proceed with further processing, if necessary
          }
        }
      );
    }
    res.status(201).json({
      newUsername: username,
      newBio: bio,
      newPicPath: picPath,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDuplicateWithDifferentExtension = (
  picFileType,
  username,
  callback
) => {
  const checkForFileAndDelete = (filePath, callbackDone) => {
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
      //fs.constants.F_OK check existance of a file.
      if (!accessErr) {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            callbackDone(unlinkErr);
          } else {
            callbackDone(null);
          }
        });
      }
    });
  };
  let filesChecked = 0;
  const finalCallback = (err) => {
    if (err) {
      return callback(err);
    }
    filesChecked++;
    if (filesChecked === 2) {
      callback(null, "Duplicates deleted.");
    }
  };
  let alternativeExtension;
  let alternativeExtensionTwo;

  console.log(picFileType);
  if (picFileType === "jpeg") {
    alternativeExtension = "png";
    alternativeExtensionTwo = "jpg";
  } else if (picFileType === "png") {
    alternativeExtension = "jpg";
    alternativeExtensionTwo = "jpeg";
  } else if (picFileType === "jpg") {
    alternativeExtension = "png";
    alternativeExtensionTwo = "jpeg";
  }

  const alternativeFilePath = path.join(
    __dirname,
    `../public/${username}.${alternativeExtension}`
  );
  const alternativeFilePathTwo = path.join(
    __dirname,
    `../public/${username}.${alternativeExtensionTwo}`
  );
  console.log(alternativeFilePath, alternativeFilePathTwo);
  checkForFileAndDelete(alternativeFilePath, finalCallback);
  checkForFileAndDelete(alternativeFilePathTwo, finalCallback);
};

const searchProfiles = async (req, res) => {
  const searchTerm = req.query.term;
  console.log(searchTerm);

  try {
    const regex = new RegExp("^" + searchTerm, "i");
    const profiles = await Profile.find({ username: { $regex: regex } });
    console.log(profiles);
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserProfile,
  getUserProfile,
  searchProfiles,
  updateProfile,
};
