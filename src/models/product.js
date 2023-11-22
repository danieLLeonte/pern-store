const db = require("../db/index");

class Product {
  static async create(name, description, price, quantity, imageUrl, userId) {
    const result = await db.query(
      "INSERT INTO products (name, description, price, quantity, imageUrl, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, price, quantity, imageUrl, userId]
    );

    return result;
  }
}

module.exports = Product;
