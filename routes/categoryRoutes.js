const express = require("express");
const router = express.Router();
const categoryRoutes = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/get-categories")
  .get(authMiddleware, categoryRoutes.getCategories);
router
  .route("/add-categories")
  .post(authMiddleware, categoryRoutes.createCategory);
router
  .route("/update-categories/:id")
  .put(authMiddleware, categoryRoutes.updateCategory);
router
  .route("/delete-categories")
  .post(authMiddleware, categoryRoutes.deleteCategory);

module.exports = router;
