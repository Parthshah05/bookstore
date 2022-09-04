const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  updateCategory,
  removeCategory

} = require("../controllers/category");

const { isSignedIn } = require("../controllers/auth");

router.get("/category/view", isSignedIn, getAllCategory);

router.post("/category/create", isSignedIn, createCategory);

router.put("/category/update", isSignedIn, updateCategory);

router.delete("/category/delete", isSignedIn, removeCategory);

// router.param("settingId", getSettingById);

// router.get("/setting/view/:settingId", isSignedIn,getSetting);

module.exports = router;
