const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //check authenticity.
  console.log("running auth");

  const { authorization } = req.headers; //get the token.
  if (!authorization) {
    return res.status(401).json({ error: "auth token required" });
  }
  const token = authorization.split(" ")[1]; //get the middle section of the token.
  try {
    const { _id, email } = jwt.verify(token, process.env.SECRET); //verify the token with the secret string.
    const user = await User.findOne({ _id }).select("_id email");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    req.token = token;
    next(); //move onto the next route.
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request not authorised" });
  }
};

module.exports = requireAuth;
