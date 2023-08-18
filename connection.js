const mongoose = require("mongoose");

const connectDB = (url) => {
    console.log(url);
  return mongoose.set("strictQuery",false).connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
};

module.exports = connectDB;
