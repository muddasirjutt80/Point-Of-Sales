const express = require("express");
const router = express.Router();
const userRoutes = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/login").post(userRoutes.loginController);
router.route("/signup").post(userRoutes.signupController);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully!" });
});
router.get("/status", authMiddleware, (req, res) => {
  if (req.user) {
    return res.status(200).json({ isAuthenticated: true });
  }
  return res.status(401).json({ isAuthenticated: false });
});
router.route("/get-profile").get(authMiddleware, userRoutes.getUserProfile);
router
  .route("/update-profile")
  .post(authMiddleware, userRoutes.updateUserProfile);

module.exports = router;
