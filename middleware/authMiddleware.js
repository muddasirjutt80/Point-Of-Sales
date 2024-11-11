const jwt = require("jsonwebtoken");
const JWT_SECRET = "knckdnvkjenvj";
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Something went wrong with the auth middleware", err);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
