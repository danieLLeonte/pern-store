const asyncHandler = require("express-async-handler");

const db = require("../db/index");

// GET: /users | getUsers()
const getUsers = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(result.rows);
});

// GET: /users/:id | getUserById()
const getUserById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  res.status(200).json(result.rows);
});

// POST: /users | createUser()
const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const result = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  res.status(201).send(`User added with ID: ${result.rows[0].id}`);
});

// PUT: /users/:id | updateUser()
const updateUser = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const result = await db.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id]
  );
  res.status(200).send(`User modified with ID: ${id}`);
});

// DELETE: /users/:id | deleteUser()
const deleteUser = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await db.query("DELETE FROM users WHERE id = $1", [id]);
  res.status(200).send(`User deleted with ID: ${id}`);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
