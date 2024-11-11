const express = require("express");
const router = express.Router();
const billsRoutes = require("../controllers/billsController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/add-bills").post(authMiddleware, billsRoutes.addBillsController);
router.route("/get-bills").get(authMiddleware, billsRoutes.getBillsController);

module.exports = router;
