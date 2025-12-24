const notFound = (_, res) => {
  res.error(new Error('Resource not found'), 404);
};

module.exports = notFound;
