const CheckISRC = (req, res, next) => {
  const isValid = (_req) =>
    _req.body &&
    _req.body.ISRC &&
    _req.body.idx &&
    Number.isNaN(parseInt(_req.body.ISRC, 10)) &&
    !Number.isNaN(parseInt(_req.body.idx, 10));
  if (!isValid(req)) {
    return res.status(400).json({
      success: false,
      message:
        "Required 'ISRC' or 'idx' body parameters absent or of wrong type",
    });
  } else {
    next();
  }
};

module.exports = {
  CheckISRC,
};
