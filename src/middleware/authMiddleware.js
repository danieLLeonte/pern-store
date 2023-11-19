const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const token = req.cookies["jwt"];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const decoded = jwt.verify(token, secret);
  req.user = decoded.user;
  next();
};
