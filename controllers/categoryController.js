const Category = require("../models/categoriesModel");
const User = require("../models/userModel");

//get
exports.getCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await Category.find({ user: userId });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

//add
exports.createCategory = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const newCategory = new Category({
      ...req.body,
      user: userId,
    });
    await newCategory.save();
    const user = await User.findById(userId);
    user.categories.push(newCategory._id);
    await user.save();

    res.status(200).send("Category Created Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//update
exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const userId = req.user.id;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { name },
      { new: true }
    );
    if (!category) {
      return res
        .status(400)
        .json({ error: "Category not found or not authorized" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

//delete
exports.deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    await Category.findOneAndDelete({
      _id: req.body.categoryId,
      user: userId,
    });

    res.status(200).json({ msg: "Category deleted" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};
