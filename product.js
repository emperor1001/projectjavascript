const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  productImage: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;