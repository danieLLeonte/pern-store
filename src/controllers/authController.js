const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const db = require("../db");

const protectedRoute = (req, res) => {
  res.json({
    message: "You're accessing a protected route!",
    user: req.user,
  });
};

// GET: /auth/check | authCheck()
const authCheck = (req, res) => {
  res.json({
    ...req.user,
  });
};

// GET: /auth/logout | logout()
const logout = (req, res) => {
  res.cookie("jwt", "none", {
    ...config,
    expires: new Date(Date.now() + 5 * 1000),
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// POST: /auth/signup | signup()
const signup = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  validateInputs(username, password);

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );

  const token = generateToken(result.rows[0]);
  res.cookie("jwt", token, config);
  res.send({
    id: result.rows[0].id,
    username: result.rows[0].username,
  });
});

// POST: /auth/signin | signin()
const signin = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  validateInputs(username, password);

  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    const validPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (validPassword) {
      const token = generateToken(result.rows[0]);
      res.cookie("jwt", token, config);
      res.send({
        id: result.rows[0].id,
        username: result.rows[0].username,
      });
    } else {
      res.send("Invalid password");
    }
  } else {
    res.send("User not found");
  }
});

const validateInputs = (username, password) => {
  if (username.trim().length < 5)
    throw new Error("Username must be at least 5 characters long");
  if (password.trim().length < 6)
    throw new Error("Password must be at least 6 characters long");
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const config = {
  secure: process.env.NODE_ENV === "development" ? false : true,
  httpOnly: process.env.NODE_ENV === "development" ? false : true,
  sameSite: process.env.NODE_ENV === "development" ? false : "none",
};

module.exports = {
  signup,
  signin,
  protectedRoute,
  authCheck,
  logout,
};
