const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;
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
});

profileSchema.statics.createProfile = async function (
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

  const profileData = { email, username, bPublic };

  if (bio) {
    profileData.bio = bio;
  }

  const profile = await this.create(profileData);

  return profile;
};

profileSchema.statics.setPic = async function (profile, path) {
  console.log("ran setpic");
  profile.picFile = path;
  return profile;
};
module.exports = mongoose.model("Profile", profileSchema);
