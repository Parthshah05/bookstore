const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user");
const { isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/view/:userId", isSignedIn, getUser);
router.get("/user/viewall", isSignedIn, getAllUsers);
router.put("/user/:userId", isSignedIn, updateUser);

router.delete("/user/:userId", isSignedIn, deleteUser);

module.exports = router;
