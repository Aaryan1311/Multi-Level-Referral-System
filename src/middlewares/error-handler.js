const { ErrorResponse } = require('../utils/common');

function errorHandler(err, req, res, next){
  ErrorResponse.message = err.message || 'Internal Server Error';
  ErrorResponse.error = err.explanation || {};
  ErrorResponse.data = {};

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json(ErrorResponse);
};

module.exports = errorHandler;
