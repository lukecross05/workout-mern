const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const createUserProfile = async (req, res) => {
  const userEmail = req.user.email; //takes all the fields needed to create a profile from the frontend request.
  const user = req.user;
  const { username, bio, bPublic, picFileType } = req.body;

  const picPath = `${username}.${picFileType}`; //creates the path for the profile picture to be stored at.
  const token = req.token;

  try {
    const profile = await Profile.createProfile(
      //creates an instance of the profile.
      userEmail,
      username,
      bio ? bio : undefined,
      bPublic
    );
    if (req.file) {
      //if a profile picture was uploaded, make a full file path for it to be stored in the public folder.
      const uploadedFile = req.file;
      const targetPath = path.join(
        __dirname,
        `../public/${username}.${picFileType}`
      );
      fs.rename(uploadedFile.path, targetPath, (error) => {
        //then move it from temporary location to the target path.
        if (error) {
          console.error("Error moving file:", error);
        } else {
          console.log("File saved successfully!");
        }
      });

      await Profile.setPic(profile, picPath); //save the profile picture into db.
      await profile.save();
    }

    await User.setObj(user, profile._id); //Update user to contain the objectID of the profile.
    await user.save();

    const updatedUser = await User.findById(user._id);
    const { email, profileID } = updatedUser;
    const friendRequests = [];

    res.status(201).json({
      //return fields the frontend needs.
      newEmail: email,
      newToken: token,
      newProfileID: profileID,
      newUsername: username,
      newBio: bio,
      newPicPath: picPath,
      friendRequests,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUserFriends = async (req, res) => {
  //return a list of the users friend requests.

  const userProfileID = req.params.id;
  try {
    const profile = await Profile.findOne({ username: userProfileID }); //get user user from database, and return its friends
    if (!profile) {
      return res.status(404).json({ error: "profile not found. " });
    }

    console.log(profile);
    res.status(200).json(profile); //return the profile which contains the friends requests.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProfileFromFriendsList = async (req, res) => {
  try {
    const usernameOfSender = req.query.usernameOfSender; //get fields from url.
    const emailOfRecipient = req.query.emailOfRecipient;
    console.log(usernameOfSender, emailOfRecipient);

    const profile = await Profile.findOne({ email: emailOfRecipient }); //find the profile for which we will remove a friend request.
    console.log(profile);

    await Profile.deleteUsernameFromFriendRequests(usernameOfSender, profile); //call routine to delete the request.
    res.status(200).json(profile); //respons with updated profile.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const usernameOfSender = req.query.usernameOfSender; //get fields from url.
    const emailOfRecipient = req.query.emailOfRecipient;
    console.log(usernameOfSender, emailOfRecipient);

    const profile = await Profile.findOne({ email: emailOfRecipient }); //find the profile for which we will add friend too.
    console.log(profile);

    //call method from profile schema.
    await Profile.addUsernameToFriendList(usernameOfSender, profile); //call routine to add the friend.

    const profileOfSender = await Profile.findOne({
      //locate the profile of the friend.
      username: usernameOfSender,
    });
    const { username } = profile; //grab the username of the recipient.
    Profile.addUsernameToFriendList(username, profileOfSender); //add the recipient to the friends' friends list.

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  const userProfileID = req.params.id; //return a profile to veiw.
  console.log(userProfileID);
  try {
    const profile = await Profile.findOne({ _id: userProfileID }); //grab profile from database.
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    console.log(profile);
    res.status(200).json(profile); //respond with profile.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProfile = async (req, res) => {
  const username = req.params.id; //get username from url.
  const { bio, bPublic, picFileType, email } = req.body;

  const profileToUpdate = { username, bio, bPublic, email };

  const picPath = `${username}.${picFileType}`; //define the pictures path.

  try {
    await Profile.findOneAndUpdate(
      //update the profile
      { username: username },
      profileToUpdate,
      { new: true }
    );

    if (req.file) {
      //if a photo is added to the edit profile, we delete the old one and replace it with a new one.
      const uploadedFile = req.file;
      const targetPath = path.join(
        //create the target path like before.
        __dirname,
        `../public/${username}.${picFileType}`
      );
      fs.rename(uploadedFile.path, targetPath, (error) => {
        //change the location from the temp path to the target path.
        if (error) {
          console.error("Error moving file:", error);
        } else {
          console.log("File saved successfully!");
        }
      });
      deleteDuplicateWithDifferentExtension(
        //this method checks for any of the users old profile pictures with a different extension, as multiple formats are accepted.
        picFileType,
        username,
        (err, message) => {
          //callback function for method.
          if (err) {
            //log any errors.
            console.error("Error:", err);
          } else {
            //log success message.
            console.log(message);
          }
        }
      );
    }
    res.status(201).json({
      //respond with updated fields.
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
    //helper function to check if file exists and delete it if it does.
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
      //fs.constants.F_OK check existance of a file.
      if (!accessErr) {
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) {
            //pass ant unlink errors to the final callback.
            callbackDone(unlinkError);
          } else {
            //succesful delete.
            callbackDone(null);
          }
        });
      }
    });
  };

  let filesChecked = 0;

  //final callback to handle results after checking for both files.
  const finalCallback = (error) => {
    if (error) {
      return callback(error);
    }
    filesChecked++;
    //if both files checked, callback.
    if (filesChecked === 2) {
      callback(null, "duplicates deleted");
    }
  };

  let alternativeExtension;
  let alternativeExtensionTwo;

  console.log(picFileType); //get the possible duplicate extension types.
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
  //get the duplicates possible file paths.
  const alternativeFilePath = path.join(
    __dirname,
    `../public/${username}.${alternativeExtension}`
  );
  const alternativeFilePathTwo = path.join(
    __dirname,
    `../public/${username}.${alternativeExtensionTwo}`
  );
  console.log(alternativeFilePath, alternativeFilePathTwo);

  //use helper to check for and delete the duplicates.
  checkForFileAndDelete(alternativeFilePath, finalCallback);
  checkForFileAndDelete(alternativeFilePathTwo, finalCallback);
};
const sendFriendRequest = async (req, res) => {
  try {
    const targetProfileEmail = req.query.emailOfRecipient;
    const targetProfile = await Profile.findOne({ email: targetProfileEmail }); //find recipients profile.

    const senderProfileEmail = req.query.emailOfSender;
    const senderProfile = await Profile.findOne({ email: senderProfileEmail });
    const senderUsername = senderProfile.username; //find senders username.

    console.log(senderUsername);
    await Profile.addUserToFriendRequest(targetProfile, senderUsername); //add username to friend requests.
  } catch (error) {}
};
const searchProfiles = async (req, res) => {
  const searchTerm = req.query.term; //get the search term from url.
  console.log(searchTerm);

  try {
    const regex = new RegExp("^" + searchTerm, "i"); //creates a regex pattern, which when compared to any other usernames will return the ones which start with seach term. the i makes it not case sensitive.
    const profiles = await Profile.find({ username: { $regex: regex } }); //compare to pattern.
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
  sendFriendRequest,
  getUserFriends,
  deleteProfileFromFriendsList,
  acceptFriendRequest,
};
