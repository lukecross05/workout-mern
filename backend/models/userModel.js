const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileID: {
    type: ObjectId,
    required: false,
  },
});

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("this is not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password isnt strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email doesnt exist");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    console.log(password);
    throw Error("incorrect password 1");
  }
  return user;
};

userSchema.statics.setObj = async function (user, objid) {
  console.log("ran objid");
  if (ObjectId.isValid(objid)) {
    user.profileID = objid.toString();
  }
  console.log(user);
  return user;
};

module.exports = mongoose.model("User", userSchema);
