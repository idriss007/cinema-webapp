const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message) {
    const statusCode = 400;
    super(message, statusCode);
  }
}

module.exports = BadRequestError;
