const asyncHandler = require("express-async-handler");

const db = require("../db/index");

// GET: /products | getProducts()
const getProducts = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT * FROM products ORDER BY product_id ASC"
  );
  res.status(200).json(result.rows);
});

module.exports = { getProducts };
