const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  signup,
  signin,
  protectedRoute,
} = require("../controllers/authController");

const router = express.Router();

router.route("/protected-route").get(auth, protectedRoute);
router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;
