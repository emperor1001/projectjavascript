module.exports = (err, res, resp, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  console.log(`Your stauts is ${err.statuscode} with \n error: "${err.message}"`);
};
