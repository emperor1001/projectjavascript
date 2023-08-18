const express = require("express");
const router = express.Router();
const { registerUserWithoutHashing, loginUser } = require("../controller/userController");
const { addProduct, deleteProductById } = require("../controller/productController");
const {
  addCategory,
  deleteCategoryById,
  readAllCategories,
} = require("../controller/categoryController");
const path = require("path");
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
router.post("/add-user", registerUserWithoutHashing);
router.post("/login", loginUser);
const upload = multer({ storage: storage });

router.post("/add-product", upload.single("productImage"), addProduct);
router.delete("/delete-product/:id", deleteProductById);


router.post("/add-category", addCategory);
router.delete("/delete-category/:id", deleteCategoryById);
router.get("/read-category", readAllCategories);


module.exports = router;
