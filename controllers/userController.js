const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
  isValidUserName,
} = require("../validator/signup.validator.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(payload, JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          maxAge: 86400 * 1000,
          httpOnly: true,
        });
        res.status(200).send(user);
      });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//signup
exports.signupController = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const errors = [];

    if (!isValidFirstName(firstName))
      errors.push({
        field: "firstName",
        message: "First Name must contain atleast 2 characters",
      });
    if (!isValidLastName(lastName))
      errors.push({
        field: "lastName",
        message: "Last Name must contain atleast 2 characters",
      });
    if (!isValidUserName(username))
      errors.push({
        field: "username",
        message: "Username is unavailable",
      });
    if (!isValidEmail(email))
      errors.push({
        field: "email",
        message: "Invalid email format",
      });

    if (!isValidPassword(password))
      errors.push({
        field: "password",
        message: "Password does not meet requirements",
      });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already registered. Please choose another email",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const securePass = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: securePass,
    });
    await newUser.save();
    console.log(newUser);
    return res.json({
      status: "success",
      message: "Your account has been created!",
      body: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

////////////USER PROFILE//////////////
// get profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("products")
      .populate("categories")
      .populate("bills");
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      username: user.username,
      email: user.email,
      productsCount: user.products.length,
      categoriesCount: user.categories.length,
      billsCount: user.bills.length,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};

// update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, companyName } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, companyName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
