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
});

profileSchema.statics.createProfile = async function (email, username, bio) {
  if (!email || !username) {
    throw Error("all essential fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("this is not a valid email");
  }

  const profileData = { email, username };

  if (bio) {
    profileData.bio = bio;
  }

  const profile = await this.create(profileData);

  return profile;
};

module.exports = mongoose.model("Profile", profileSchema);
