const jwt = require("jsonwebtoken");
const { AppUser } = require("../models");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppUser.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: " Invalid token", error: err.message });
  }
};
module.exports = authMiddleware;
