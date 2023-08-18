const Product = require("../model/product");
const Category = require("../model/category");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const productImage = req.file;

    const newProduct = new Product({
      name,
      price,
      quantity,
      category: category._id,
      productImage: productImage.filename,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.render("dashboard-product.hbs", { products });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getAllProductsindex = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.render("index.hbs", { products });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { name, price, quantity, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        quantity,
        category: category._id,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
