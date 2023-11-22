const asyncHandler = require("express-async-handler");

const db = require("../db/index");
const Product = require("../models/product");

// GET: /products | getProducts()
const getProducts = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id ASC");

  const serverUrl = process.env.SERVER_URL;
  const productsWithImageUrls = result.rows.map((product) => ({
    ...product,
    imageurl: product.imageurl ? `${serverUrl}/${product.imageurl}` : null,
  }));

  res.status(200).json(productsWithImageUrls);
});

// GET: /products/:id | getProductById()
const getProductById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
  res.status(200).json(result.rows);
});

// POST: /products | createProduct()
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const result = await Product.create(
    name,
    description,
    price,
    quantity,
    imagePath,
    req.user.id
  );

  res.status(201).send(`Product added with ID: ${result.rows[0].id}`);
});

// PUT /products/:id | updateProduct()
const updateProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;

  const result = await db.query(
    "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4",
    [name, description, price, id]
  );

  res.status(200).send(`Product modified with ID: ${id}`);
});

// DELETE: /products/:id | deleteProduct()
const deleteProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await db.query("DELETE FROM products WHERE id = $1", [id]);
  res.status(200).send(`Product deleted with ID: ${id}`);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
