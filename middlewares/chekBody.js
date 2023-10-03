const checkBody = (req, res, next) => {
  if (!req.body.name && !req.body.price) {
    return res.status(404).json({
      status: "failed",
      message: "name or price are required",
    });
  }
  next();
};

module.exports = checkBody;
