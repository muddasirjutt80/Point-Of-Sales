const express = require("express");
const router = express.Router();
const productRoutes = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/get-products")
  .get(authMiddleware, productRoutes.getProductController);
router
  .route("/add-products")
  .post(authMiddleware, productRoutes.addProductController);
router
  .route("/update-products")
  .put(authMiddleware, productRoutes.updateProductController);
router
  .route("/delete-products")
  .post(authMiddleware, productRoutes.deleteProductController);

module.exports = router;
