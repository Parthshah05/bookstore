const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  updateProduct,
  removeProduct

} = require("../controllers/product");

const { isSignedIn } = require("../controllers/auth");

router.get("/product/view", isSignedIn, getAllProduct);

router.post("/product/create", isSignedIn, createProduct);

router.put("/product/update", isSignedIn, updateProduct);

router.delete("/product/delete", isSignedIn, removeProduct);

// router.param("settingId", getSettingById);

// router.get("/setting/view/:settingId", isSignedIn,getSetting);

module.exports = router;
