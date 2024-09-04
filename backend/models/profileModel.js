const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema; //schema for a profile.
const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
    maxlength: 300,
  },
  bPublic: {
    type: String,
    required: true,
  },
  picFile: {
    type: String,
    required: false,
  },
  friendRequests: [
    {
      type: String,
      required: true,
    },
  ],
  friends: [
    {
      type: String,
      required: true,
    },
  ],
});

profileSchema.statics.createProfile = async function (
  //method to create a profile model.
  email,
  username,
  bio,
  bPublic
) {
  if (!email || !username) {
    throw Error("all essential fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("this is not a valid email");
  }
  const friendRequests = [];
  const friends = [];
  const profileData = { email, username, bPublic, friendRequests, friends }; //get all fields from user and create instance.

  if (bio) {
    profileData.bio = bio;
  }

  const profile = await this.create(profileData);

  return profile;
};

profileSchema.statics.setPic = async function (profile, path) {
  //function to add profile picture path to database
  console.log("set profile picture");
  profile.picFile = path;
  return profile;
};
profileSchema.statics.addUserToFriendRequest = async function (
  //function to add a profiles username into another profiles friend requests.
  profileToSendRequestTo,
  profileSendingRequestsUsername
) {
  console.log(profileSendingRequestsUsername);
  if (
    //checks if user has already sent a request or is already friends.
    !profileToSendRequestTo.friendRequests.includes(
      profileSendingRequestsUsername
    ) &&
    !profileToSendRequestTo.friends.includes(profileSendingRequestsUsername)
  ) {
    profileToSendRequestTo.friendRequests.push(profileSendingRequestsUsername); //adds to list.
    await profileToSendRequestTo.save();
  }
  return profileToSendRequestTo;
};

profileSchema.statics.deleteUsernameFromFriendRequests = async function (
  //deletes a request.
  username,
  profile
) {
  console.log(profile.friendRequests);
  profile.friendRequests = profile.friendRequests.filter(
    //filters through all requests and keeps those which arent the username to delete.
    (request) => request !== username
  );
  console.log(profile.friendRequests);
  return profile;
};

profileSchema.statics.addUsernameToFriendList = async function (
  //this function is used when a user accepts a friend request.
  username,
  profile
) {
  console.log(username, profile);
  console.log(profile.friends);
  if (!profile.friends.includes(username)) {
    //checks i users already friends before pushing their username onto friends list.
    profile.friends.push(username);
    console.log(profile.friends);
  }

  await profile.save();
};
module.exports = mongoose.model("Profile", profileSchema);
