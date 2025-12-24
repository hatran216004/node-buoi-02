const responseApi = (_, res, next) => {
  res.success = (data, statusCode) => {
    res.status(statusCode).json({
      status: 'success',
      data
    });
  };

  res.error = (error, statusCode) => {
    res.status(statusCode).json({
      status: 'error',
      message: error.message
    });
  };

  next();
};

module.exports = responseApi;
