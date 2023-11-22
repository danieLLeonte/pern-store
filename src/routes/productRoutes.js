const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { upload } = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const { product } = require("../schemas/validation");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(auth, upload.single("image"), validate(product), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;
