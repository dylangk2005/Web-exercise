module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field"
    });
  }

  res.status(500).json({
    message: err.message || "Server error"
  });
};