const Product = require("../models/productModel");
const User = require("../models/userModel");

//for fetch
exports.getProductController = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ user: userId });
    res.status(200).json(products);
  } catch (error) {
    res.json("error fetching products");
  }
};

//add
exports.addProductController = async (req, res) => {
  try {
    const userId = req.user.id;
    const newProduct = new Product({
      ...req.body,
      user: userId,
    });
    await newProduct.save();
    const user = await User.findById(userId);
    user.products.push(newProduct._id);
    await user.save();

    res.status(200).send("Product Created Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//for update
exports.updateProductController = async (req, res) => {
  try {
    const userId = req.user.id;
    await Product.findOneAndUpdate(
      { _id: req.body.productId, user: userId },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json("Product Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
exports.deleteProductController = async (req, res) => {
  try {
    const userId = req.user.id;
    await Product.findOneAndDelete({ _id: req.body.productId, user: userId });
    res.status(200).json("Product Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
