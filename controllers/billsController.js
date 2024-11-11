const Bills = require("../models/billsModel.js");
const User = require("../models/userModel");

//for add
exports.addBillsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const newBills = new Bills({
      ...req.body,
      user: userId,
    });
    await newBills.save();
    res.status(200).send("Bill Created Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//for get
exports.getBillsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const bills = await Bills.find({ user: userId });
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching bills");
  }
};
