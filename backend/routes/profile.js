const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  //import methods from profileController.
  createUserProfile,
  getUserProfile,
  searchProfiles,
  updateProfile,
  sendFriendRequest,
  getUserFriends,
  deleteProfileFromFriendsList,
  acceptFriendRequest,
} = require("../controllers/profileController");

const requireAuth = require("../middleware/requireAuth"); //import middleware.

const uploadDir = path.join(__dirname, "../public"); //define the upload directory for temporarily saving images.
const upload = multer({ dest: uploadDir });

const router = express.Router();

router.patch("/profile/add", sendFriendRequest); //this route sends a friend request to a user, this is the only unprotected route.

router.use(requireAuth); //middle ware to verify user.

router.get("/profile/friends/:id", getUserFriends); //all other routes.

router.get("/profile/:id", getUserProfile);

router.post("/profile", upload.single("picFile"), createUserProfile);

router.get("/search", searchProfiles);

router.patch("/profile/acceptfriendrequest", acceptFriendRequest);

router.patch("/profile/:id", upload.single("picFile"), updateProfile);

router.delete("/profile/deletefriendrequest", deleteProfileFromFriendsList);

module.exports = router;
