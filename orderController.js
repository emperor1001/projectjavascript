const Order = require("../models/Order");


exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      products: req.body.products,
    });

    await newOrder.save();
    res.redirect("/user/orders");
  } catch (error) {

  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.render("userOrders", { userOrders });
  } catch (error) {

  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate("user products.product");
    res.render("allOrders", { allOrders });
  } catch (error) {

  }
};
