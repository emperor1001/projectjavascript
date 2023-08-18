const catchAsyncError = (passedfunction) => (req, resp, next) => {
  Promise.resolve(passedfunction(req, resp, next)).catch(next);
};

module.exports = catchAsyncError;
