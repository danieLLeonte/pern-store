const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  signup,
  signin,
  protectedRoute,
  authCheck,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.route("/protected-route").get(auth, protectedRoute);
router.route("/check").get(auth, authCheck);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(auth, logout);

module.exports = router;
