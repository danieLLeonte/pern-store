const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(auth, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;
