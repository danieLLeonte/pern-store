const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const token = req.header("x-auth-token");

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const decoded = jwt.verify(token, secret);
  req.user = decoded.user;
  next();
};
